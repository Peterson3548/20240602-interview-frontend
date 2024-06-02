<template>
  <div>
    <div class="grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="col-3"
      >
        <Card>
          <template #header>
            <Skeleton
              width="100%"
              height="309px"
            />
          </template>

          <template #title>
            <Skeleton />
          </template>

          <template #subtitle>
            <Skeleton />
          </template>

          <template #content>
            <div class="flex gap-2">
              <span class="text-primary">
                <Skeleton />
              </span>

              <span class="line-through">
                <Skeleton />
              </span>
            </div>
          </template>

          <template #footer>
            <Skeleton />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = Array.from(Array(10).keys())
</script>
