# Script to get the current time with format YYMMDD-HHmm and YYYY-MM-DD HH:mm:ss

# Get the current date and time
current_time=$(date "+%Y-%m-%d %H:%M:%S")
current_time_short=$(date "+%y%m%d-%H%M")

# Print the current date and time
echo "$current_time"
echo "$current_time_short"