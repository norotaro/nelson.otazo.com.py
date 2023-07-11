<script setup>
const isMenuOpen = ref(false);
const menu = {
    title: 'Nelson Otazo',
    options: [
        {
            title: 'Home',
            href: '/'
        },
        {
            title: 'Blog',
            href: '/blog/page/1'
        }
    ]
};
</script>
<template>
    <div class="
      px-4
      py-5
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-8
    ">
        <div class="relative flex items-center justify-between">
            <BaseNavTitle :title="menu.title"></BaseNavTitle>
            <ul class="items-center hidden space-x-8 lg:flex">
                <li v-for="(option, k) in menu.options" :key="k">
                    <a :href="option.href" :aria-label="option.title" :title="option.title" class="
              font-medium
              tracking-wide
              text-gray-700
              transition-colors
              duration-200
              hover:text-cyan-400
            ">
                        {{ option.title }}
                    </a>
                </li>
            </ul>
            <div class="lg:hidden">
                <button aria-label="Open Menu" title="Open Menu" class="
            p-2
            -mr-1
            transition
            duration-200
            rounded
            focus:outline-none
            focus:shadow-outline
            hover:bg-cyan-50
            focus:bg-cyan-50
          " @click="isMenuOpen = true">
                    <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
                        <path fill="currentColor"
                            d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
                        <path fill="currentColor"
                            d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
                    </svg>
                </button>
                <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full z-40">
                    <div class="p-5 bg-white border rounded shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <BaseNavTitle :title="menu.title" />
                            </div>
                            <div>
                                <button aria-label="Close Menu" title="Close Menu" class="
                    p-2
                    -mt-2
                    -mr-2
                    transition
                    duration-200
                    rounded
                    hover:bg-gray-200
                    focus:bg-gray-200
                    focus:outline-none
                    focus:shadow-outline
                  " @click="isMenuOpen = false">
                                    <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <nav>
                            <ul class="space-y-4">
                                <li v-for="(option, k) in menu.options" :key="k">
                                    <NuxtLink :to="option.href" :aria-label="option.title" :title="option.title" class="
                      font-medium
                      tracking-wide
                      text-gray-700
                      transition-colors
                      duration-200
                      hover:text-cyan-400
                    ">
                                        {{ option.title }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
