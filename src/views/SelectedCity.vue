<template>
    <div>
        <Suspense>
            <AsyncSelectedCity />
            <template #fallback>
                <p>Loading...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncSelectedCity from '@/components/AsyncSelectedCity.vue';
</script>