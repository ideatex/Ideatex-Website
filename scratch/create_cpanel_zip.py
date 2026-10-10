import os
import zipfile
import sys

source_dir = os.path.abspath('cpanel-deploy')
zip_path = os.path.abspath('ideatex-cpanel-build.zip')

print(f"Creating cPanel ZIP from: {source_dir}")
print(f"Destination ZIP: {zip_path}")

if os.path.exists(zip_path):
    os.remove(zip_path)

entry_count = 0
with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
    for root, dirs, files in os.walk(source_dir):
        # Sort for deterministic archive
        dirs.sort()
        files.sort()
        for file in files:
            full_path = os.path.join(root, file)
            # Relative path from source_dir
            rel_path = os.path.relpath(full_path, source_dir)
            # FORCE standard forward slashes for Linux/cPanel compatibility
            arcname = rel_path.replace(os.sep, '/')
            
            zf.write(full_path, arcname=arcname)
            entry_count += 1

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"[OK] ZIP successfully created with {entry_count} entries ({size_mb:.2f} MB)")
print("[OK] All archive paths strictly formatted with standard POSIX '/' slashes for Linux/cPanel")
