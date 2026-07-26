#!/usr/bin/env bash
# =============================================================================
# push-prod-db.sh — Push Prisma schema to PRODUCTION PostgreSQL (Vercel)
# =============================================================================
# Usage:
#   bash push-prod-db.sh "postgresql://user:pass@host:5432/dbname?schema=public"
#
# Or set VERCEL_TOKEN and this script will auto-pull DATABASE_URL from Vercel:
#   VERCEL_TOKEN=xxxx bash push-prod-db.sh
#
# What it does:
#   1. Backs up your current .env
#   2. Temporarily sets DATABASE_URL to the production PostgreSQL URL
#   3. Runs `prisma db push` (creates all 7 tables in production Postgres)
#   4. Restores your original .env (local SQLite)
#   5. Verifies the push succeeded
# =============================================================================

set -euo pipefail

cd "$(dirname "$0")"

PROD_URL="${1:-}"
ENV_FILE=".env"
BACKUP=".env.backup-$(date +%s)"

echo "=========================================="
echo "  Production Database Push — NextGen DS"
echo "=========================================="

# --- Step 1: Get the production DATABASE_URL ---
if [[ -z "$PROD_URL" && -n "${VERCEL_TOKEN:-}" ]]; then
  echo "▸ VERCEL_TOKEN detected — pulling DATABASE_URL from Vercel..."
  npx vercel env pull .env.vercel-prod --environment=production --token="$VERCEL_TOKEN" 2>/dev/null || true
  if [[ -f .env.vercel-prod ]]; then
    PROD_URL=$(grep "^DATABASE_URL=" .env.vercel-prod | head -1 | cut -d'=' -f2- | tr -d '"')
    rm -f .env.vercel-prod
  fi
fi

if [[ -z "$PROD_URL" ]]; then
  echo ""
  echo "❌ ERROR: No production DATABASE_URL provided."
  echo ""
  echo "USAGE (option A — paste URL directly):"
  echo "  bash push-prod-db.sh \"postgresql://user:pass@host:5432/dbname?schema=public\""
  echo ""
  echo "USAGE (option B — use Vercel token):"
  echo "  1. Create a token at: https://vercel.com/account/tokens"
  echo "  2. VERCEL_TOKEN=xxxx bash push-prod-db.sh"
  echo ""
  echo "WHERE TO FIND DATABASE_URL in Vercel Dashboard:"
  echo "  Project → Settings → Storage → Postgres → Connect → 'psql' string"
  echo "  (starts with postgresql:// and contains ?sslmode=require)"
  exit 1
fi

if [[ "$PROD_URL" == file:* ]]; then
  echo "❌ ERROR: The URL looks like a SQLite path, not PostgreSQL."
  echo "   Production needs a postgresql:// connection string."
  exit 1
fi

echo "▸ Production URL: ${PROD_URL:0:40}...${PROD_URL: -20}"
echo ""

# --- Step 2: Backup current .env ---
cp "$ENV_FILE" "$BACKUP"
echo "✓ Backed up .env → $BACKUP"

# --- Step 3: Set production URL temporarily ---
echo "DATABASE_URL=$PROD_URL" > "$ENV_FILE"
echo "✓ Temporarily switched .env to production PostgreSQL"

# --- Step 4: Run prisma db push ---
echo ""
echo "▸ Running prisma db push (creates 7 tables in production)..."
echo ""
set +e
bun run db:push 2>&1
PUSH_EXIT=$?
set -e

# --- Step 5: Restore original .env ---
cp "$BACKUP" "$ENV_FILE"
echo ""
echo "✓ Restored original .env (local SQLite)"

if [[ $PUSH_EXIT -eq 0 ]]; then
  echo ""
  echo "=========================================="
  echo "  ✅ SUCCESS — Production database ready!"
  echo "=========================================="
  echo ""
  echo "All 7 tables created in Vercel Postgres:"
  echo "  • User, Lead, LeadActivity, Booking"
  echo "  • NewsletterSubscriber, ChatConversation, TrackingEvent"
  echo ""
  echo "Now these APIs will work on Vercel:"
  echo "  • /api/newsletter  (newsletter subscriptions)"
  echo "  • /api/leads        (admin dashboard)"
  echo "  • /api/book-call    (booking saves)"
  echo "  • /api/careers      (job applications)"
  echo "  • /api/chat-save    (chat history)"
  echo "  • /api/track        (analytics events)"
  echo ""
  echo "Test it:"
  echo "  curl -X POST https://nextgen-digital-studio-pxsmnbicw-electronics-mart.vercel.app/api/newsletter \\"
  echo "    -H 'Content-Type: application/json' -d '{\"email\":\"test@example.com\"}'"
else
  echo ""
  echo "=========================================="
  echo "  ❌ FAILED — db:push exited with code $PUSH_EXIT"
  echo "=========================================="
  echo "Your .env has been restored to local SQLite."
  echo "Check the error above. Common causes:"
  echo "  • Wrong DATABASE_URL (check for typos)"
  echo "  • Database not accessible (IP whitelist / Vercel Postgres region)"
  echo "  • Schema provider mismatch (should auto-convert sqlite→postgresql)"
fi

exit $PUSH_EXIT
