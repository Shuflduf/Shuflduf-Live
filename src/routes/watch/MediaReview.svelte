<script lang="ts">
  import type { Review } from "$lib";

  let { review }: { review: Review } = $props();
</script>

<div class="flex flex-row gap-4">
  <img
    src={review.avatarPath
      ? `https://image.tmdb.org/t/p/w185${review.avatarPath}`
      : `https://nyc.cloud.appwrite.io/v1/avatars/initials?name=${review.username}`}
    alt="{review.username} avatar"
    class="aspect-square h-16 w-16 rounded-full object-cover"
  />
  <div class="dark:text-white">
    <p class="font-[Arvo]">{review.username}</p>
    <a class="line-clamp-3 text-sm" href={review.link}>
      {review.content}
    </a>
  </div>
</div>
