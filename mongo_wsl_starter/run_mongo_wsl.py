import subprocess
subprocess.Popen(["sudo", "nohup", "mongod", "--dbpath", "/home/ubuntu/data/db"])