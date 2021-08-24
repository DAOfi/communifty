readarray -d '' entries < <(printf '%s\0' *.png | sort -zV)
i=1
for entry in "${entries[@]}"; do
  # do something with $entry
  ffmpeg -i $i.png -vf scale=400:-1  ${i}_resized.png
  ((i=i+1))
done
