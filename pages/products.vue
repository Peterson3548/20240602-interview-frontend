<template>
  <div>
    <template v-if="productsPending">
      <ProductSkeleton />
    </template>

    <template v-else-if="products?.data">
      <div class="grid mb-2">
        <div class="col-6 flex flex-column gap-2">
          <label for="name">
            產品名稱
          </label>

          <InputText
            id="name"
            v-model="form.name"
          />
        </div>

        <div class="col-6 flex flex-column gap-2">
          <label for="brandId">
            廠牌名稱
          </label>

          <Dropdown
            v-model="form.brandId"
            show-clear
            :loading="brandsPending"
            :options="brands.data"
            option-label="name"
            option-value="id"
          />
        </div>

        <div class="col-3 flex flex-column gap-2">
          <label for="minOfficialPrice">
            最低官方標價
          </label>

          <InputNumber
            v-model="form.minOfficialPrice"
            input-id="minOfficialPrice"
            show-buttons
            :min="0"
            :step="5000"
          />
        </div>

        <div class="col-3 flex flex-column gap-2">
          <label for="maxOfficialPrice">
            最高官方標價
          </label>

          <InputNumber
            v-model="form.maxOfficialPrice"
            input-id="maxOfficialPrice"
            show-buttons
            :min="0"
            :step="5000"
          />
        </div>

        <div class="col-3 flex flex-column gap-2">
          <label for="minActualPrice">
            最低實際售價
          </label>

          <InputNumber
            v-model="form.minActualPrice"
            input-id="minActualPrice"
            show-buttons
            :min="0"
            :step="5000"
          />
        </div>

        <div class="col-3 flex flex-column gap-2">
          <label for="maxActualPrice">
            最高實際售價
          </label>

          <InputNumber
            v-model="form.maxActualPrice"
            input-id="maxActualPrice"
            show-buttons
            :min="0"
            :step="5000"
          />
        </div>

        <div class="col-12">
          <div class="flex gap-2">
            <Button
              label="清除篩選"
              icon="pi pi-filter-slash"
              severity="danger"
              @click="onClearFilter"
            />

            <Button
              label="篩選"
              icon="pi pi-filter"
              @click="onFilter"
            />
          </div>
        </div>
      </div>

      <div class="grid">
        <div
          v-for="product in products.data"
          :key="product.name"
          class="col-3"
        >
          <Card>
            <template #header>
              <img
                alt="product_image"
                :src="product.image_url"
                class="w-full"
              >
            </template>

            <template #title>
              {{ product.name }}
            </template>

            <template #subtitle>
              {{ product.brand.name }}
            </template>

            <template #content>
              <div class="flex gap-2">
                <span class="text-primary">
                  ${{ product.actual_price }}
                </span>

                <span class="line-through">
                  ${{ product.official_price }}
                </span>
              </div>
            </template>

            <template #footer>
              <Button
                label="加入購物車"
                class="w-full"
                icon="pi pi-cart-plus"
              />
            </template>
          </Card>
        </div>

        <div class="col-12">
          <Paginator
            :rows="products.meta.per_page"
            :total-records="products.meta.total"
            :first="products.meta.from"
            :rows-per-page-options="[10, 20, 30]"
            @page="onPage"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const { $apiFetch } = useNuxtApp()

const page = ref(1)
const perPage = ref(10)
const form = ref({})

const { data: brands, pending: brandsPending, refresh: brandsRefresh } = await useAsyncData('brands', () => $apiFetch('/api/brands'))

const { data: products, pending: productsPending, refresh: productsRefresh } = await useAsyncData(
  'products',
  () => $apiFetch('/api/products', {
    params: {
      page: page.value,
      per_page: perPage.value,
      name: form.value.name ?? undefined,
      brand_id: form.value.brandId ?? undefined,
      min_official_price: form.value.minOfficialPrice ?? undefined,
      max_official_price: form.value.maxOfficialPrice ?? undefined,
      min_actual_price: form.value.minActualPrice ?? undefined,
      max_actual_price: form.value.maxActualPrice ?? undefined,
    },
  }),
  {
    watch: [page, perPage],
  },
)

onMounted(() => {
  brandsRefresh()
  productsRefresh()
})

function onPage(event) {
  page.value = event.page + 1
  perPage.value = event.rows
}

function onFilter() {
  productsRefresh()
}

function onClearFilter() {
  form.value = {}
  productsRefresh()
}
</script>
