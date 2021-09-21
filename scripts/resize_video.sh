readarray -d '' entries < <(printf '%s\0' *.mp4 | sort -zV)
i=1
for entry in "${entries[@]}"; do
  # do something with $entry
  ffmpeg -i ${entry} -vcodec libx265 -crf 28 resized_${entry}
  ((i=i+1))
done
