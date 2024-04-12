<template>
  <div>
    <UContainer class="flex items-center justify-center min-h-screen w-screen">
      <div>
        <img src="/logo.png" class="logo" />

        <NuxtPage />
      </div>
    </UContainer>
    <UNotifications />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 150px;
  margin: 0 auto;
  display: block;
}
</style>
