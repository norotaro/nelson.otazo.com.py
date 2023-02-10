<script setup>
// import icons from HeroIcons
import { InformationCircleIcon, ExclamationTriangleIcon, NoSymbolIcon } from "@heroicons/vue/24/solid";
// define props in <script>
const props = defineProps(["type"]);
</script>
<template>
    <!-- Access `type` prop in Dynamic class  -->
    <div class="info-box not-prose" :class="[type]">
        <!-- Conditionally render icons based on prop -->
        <ExclamationTriangleIcon v-if="type == 'warning'" class="h-6 w-6" />
        <NoSymbolIcon v-else-if="type == 'error'" class="h-6 w-6" />
        <InformationCircleIcon v-else class="h-6 w-6" />
        <details>
            <summary>
                <!-- Unamed Slot to render component content -->
                <slot />
            </summary>
            <div class="details pt-2">
                <!-- Named markdown component to render rich-text -->
                <Markdown :use="$slots.details" unwrap="p"></Markdown>
            </div>
        </details>
    </div>
</template>

<style scoped>
.info-box {
    @apply flex items-start gap-2 p-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-lg;
}

details summary {
    @apply flex font-semibold leading-tight cursor-pointer;
}

details .details {
    @apply text-sm;
}

.info-box .icon {
    @apply shrink-0;
}

.info-box.warning {
    @apply bg-yellow-200 border-yellow-400 text-yellow-600;
}

.info-box.warning .icon.solid {
    @apply fill-yellow-600;
}

.info-box.error {
    @apply bg-red-200 border-red-400 text-red-600;
}

.info-box.error .icon.solid {
    @apply fill-red-600;
}
</style>