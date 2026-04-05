# 🛠 Dev Log: Git & Configuration Issues

This file documents the troubleshooting steps taken to fix the repository structure and configuration.

## Issue: Git Push Rejected & Large Files

### Problem
- The initial push was rejected by GitHub.
- `node_modules` were accidentally included, causing massive file counts and size issues.
- The local git history became desynchronized from the remote repo after attempts to fix it.

### Solution (Start to Finish)

1. **Cleaned the Repository**:
   - Removed `node_modules` from tracking.
   - Verified `.gitignore` configuration.
2. **Rewrote History**:
   - Created a fresh "Initial commit" containing only source code.
   - This removed the large files from the project history entirely.
3. **Force Sync**:
   - Used `git push --force` to overwrite the messy history on GitHub with the clean version.
   - Re-established the upstream branch link.

## Issue: Hidden .env File

### Problem
- The `.env` file was not showing up on GitHub.
- This is standard security behavior (blocked by `.gitignore`).

### Solution
- Explicitly force-added the file using `git add -f server/.env`.
- **Note:** This makes the file visible to everyone. Ensure no production secrets are shared if the repo is public.

## Current Status
- Repository is clean and fully synced.
- `node_modules` are correctly ignored.
- `.env` is explicitly tracked.
- Server and Client error handling has been hardened.
- git add -f server/.env ; git commit -m "Config: Explicitly adding .env to repository as requested" ; git push
