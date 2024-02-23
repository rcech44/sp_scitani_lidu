import subprocess
subprocess.Popen(["sudo", "pkill", "-15", "-f", "mongod"])