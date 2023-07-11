<script setup>
const props = defineProps({
    title: { type: String, default: 'Nelson Otazo' }
})
</script>
<template>
    <a href="/" :aria-label="title" :title="title" class="inline-flex items-center">
        <svg class="w-8" viewBox="107.892 132.053 229.63 236.983" xmlns="http://www.w3.org/2000/svg">
            <rect x="107.892" y="132.97" width="69.735" height="236.066" style="fill: rgb(72, 183, 210);"/>
            <rect x="267.787" y="132.053" width="69.735" height="236.066" style="fill: rgb(72, 183, 210);"/>
            <path style="fill: rgb(251, 213, 63);" d="M 177.348 132.796 L 336.999 332.286 C 238.604 426.788 65.114 245.03 177.348 132.796 Z"/>
        </svg>
        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            {{ title }}
        </span>
    </a>
</template>