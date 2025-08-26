<script setup lang="ts"></script>

<template>
  <div class="overflow-hidden">
    <div
      class="bg-[#222] h-[80vh] flex flex-col justify-center items-center relative"
    >
      <div
        class="w-full h-full bg-[url('~/assets/images/grid.png')] bg-repeat bg-center"
      >
        <div class="flex flex-col items-center justify-center h-full">
          <div class="flex items-center justify-center mb-6 relative">
            <div class="relative inline-block">
              <!-- SVG background -->
              <svg
                class="absolute inset-0 w-full h-[84px]"
                viewBox="0 0 484 119"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M12.5474 13.8081C13.6419 5.89387 20.407 0 28.3966 0H467.635C477.343 0 484.814 8.5754 483.484 18.1918L471.453 105.192C470.358 113.106 463.593 119 455.603 119H16.365C6.65701 119 -0.81407 110.425 0.51583 100.808L12.5474 13.8081Z"
                  fill="#E2D22B"
                />
              </svg>

              <!-- Text on top -->
              <h1 class="relative text-[#222222] font-extrabold text-7xl px-6">
                7TogkID
              </h1>
            </div>
            <span class="ml-2 text-7xl text-white font-extrabold">Studio</span>
          </div>

          <h2 class="font-display text-white text-4xl text-center mt-2">
            Indonesia-Based Digital Agency
          </h2>
          <p
            class="font-archivo max-w-[954px] text-2xl text-center text-white mt-8"
          >
            7Togk Studio is a dynamic and innovative design agency that brings
            creative ideas to life. We works with a wide range of clients to
            develop unique and effective branding, web design, and graphic
            design solutions.
          </p>
        </div>
      </div>
      <div class="absolute -bottom-10 bg-background h-20 rotate-2 w-full"></div>
    </div>
    <section class="-mt-52">
      <div class="flex justify-center gap-1 py-16">
        <!-- Card 1 -->
        <div
          class="w-80 h-80 bg-gray-200 rounded-2xl shadow-lg border-4 border-white transform rotate-[6deg] -translate-y-6 overflow-hidden"
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <!-- Card 2 -->
        <div
          class="w-80 h-80 bg-gray-200 rounded-2xl shadow-lg border-4 border-white transform rotate-[-8deg] overflow-hidden"
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <!-- Card 3 -->
        <div
          class="w-80 h-80 bg-gray-200 rounded-2xl shadow-lg border-4 border-white transform rotate-[3deg] -translate-y-8 overflow-hidden"
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <!-- Card 4 -->
        <div
          class="w-80 h-80 bg-gray-200 rounded-2xl shadow-lg border-4 border-white transform rotate-[-6deg] overflow-hidden"
        >
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  </div>
</template>
