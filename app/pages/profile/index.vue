<script setup lang="ts">
import EditProfileModal from '~/components/profile/EditProfileModal.vue';
import ProfilePictureModal from '~/components/profile/ProfilePictureModal.vue';
import useModal from '~/composables/ui/modal/modal';

useHead({
    title: 'Profile',
});

interface UserProfile {
    name: string;
    email: string;
    profile_picture: string | null;
}

const session = useUserSession();

const user = computed<UserProfile | null>(() => {
    return session.user.value as UserProfile || null;
});

const EditModal = useModal({
    id: 'EditProfileModal',
})

const ProfilePicture = useModal({
    id: 'ProfilePictureModal',
})

</script>

<template>
    <div class="container mx-auto px-4 bg-gray-50 min-h-screen py-6">
        <div class="flex flex-col items-center">
            <!-- Profile Card -->
            <div class="bg-white shadow-lg rounded-2xl w-full max-w-6xl p-8">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-6">
                    <div class="flex items-center space-x-4">
                        <div class="relative w-24 h-24">
                            <img v-if="user?.profile_picture" :src="user?.profile_picture" alt="Profile"
                                class="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
                            <div v-else
                                class="w-24 h-24 rounded-full flex items-center justify-center bg-sky-200 text-blue-600 text-3xl font-semibold border-3 border-blue-500">
                                {{ user?.name ? user.name.charAt(0).toUpperCase() : '?' }}
                            </div>

                            <button type="button"
                                @click="ProfilePicture.show()"
                                class="absolute bottom-0 right-0 bg-white/80 rounded-full shadow hover:bg-gray-100 transition">
                                <svg width="29" height="30" viewBox="0 0 29 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <rect x="0.644531" y="15" width="20" height="20" transform="rotate(-45 0.644531 15)"
                                        fill="url(#pattern0_88_8)" />
                                    <defs>
                                        <pattern id="pattern0_88_8" patternContentUnits="objectBoundingBox" width="1"
                                            height="1">
                                            <use xlink:href="#image0_88_8" transform="scale(0.02)" />
                                        </pattern>
                                        <image id="image0_88_8" width="50" height="50" preserveAspectRatio="none"
                                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVR4nO2YT2vUQBiHHy91i4vs6m09iQfrV7D+waOtN8FDL2XRFrwK2vZosVa/hH4CreBJ22rxpn6AdutBKK4HL9VuFdaDkYFfZIiJnWTWJAt5YCC8yTt5f5mZd94JVFRUVDhyCJgDPgNByvYRmKEk3MogINqmihZxEvgO/AKuZRjJ8CN8AY5TIM8VyOOM/kbMS/XxaJCBXQHWgf0U08L3a57SqLq+r6cYJ5M6vJdhbv8AruLPTeBnhvcvxo2EudEH7gAtyktLWbKvmCfsm69kNA8MC3OKec027skYHYkR4KH2iC6wLFsZaCnmb7YxnHNRHsTMy/uUhyAad5KQruxngXFdG9u/aAJt4BmwpQy4r+sV3WsWJWQcOKfrTwmdjgILwFeHbLMLzAO1vIQsxwSxlDBf31vPvABuAKeBI2pjsoUboGnvPDNk4CpkRGK6GomlmMVuAtmR/5ZG7iDOAx357HiICVyFHMSoNRKvgUYKX7NONuT7NuM0CwYlZEF+mylF2GI6HntYMAghTWthu0ynJC5aCaBZhJC2tbB9WVVf00UIWZHPdfyZUV9PihASzm2TYn0Zs7Je7kJ68qnjT906awy1kKNxBaAD1dSKW+ym7PBltsjF3paPqZ18WSsy/Ta1iRm/C2TnkrUhNoouUToZzxjGZ1t93M7gPzAhNZXigQrANGKOAW/KUjRGy/ht1U4u0+lDmcr4kJa+atjPqjLRGe0zdV3PWgs7HIlcDlZpqKkU33U86pr/Z4fxI/gfQkIaSqNPdU7pqW3KNp3x7JK7kDwJonEn/aArMycUsznc/WHd47hZFPNxv0wnZexLzDD9xL4cfWDRIduUrd1NUjuhoQrXTBnbnmL8ayQqKioqKsib31TfxWHJYfb+AAAAAElFTkSuQmCC" />
                                    </defs>
                                </svg>
                            </button>
                            <input type="file" ref="fileInput" class="hidden" accept="image/*" />
                        </div>

                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">{{ user?.name }}</h2>
                            <p class="text-gray-500">{{ user?.email }}</p>
                        </div>
                    </div>
                    <button @click="EditModal.show()"
                        class="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                        Edit Profile
                    </button>
                </div>

                <!-- Info Section -->
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-500 text-sm">Full Name</label>
                                <p class="text-gray-800 font-medium">{{ user?.name }}</p>
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm">Email</label>
                                <p class="text-gray-800 font-medium">{{ user?.email }}</p>
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm">Phone</label>
                                <p class="text-gray-800 font-medium">+1 555 123 4567</p>
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm">Location</label>
                                <p class="text-gray-800 font-medium">New York, USA</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium text-gray-700 border-b pb-2 mb-4">About</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Passionate web developer with 5+ years of experience in building modern, responsive, and
                            user-friendly
                            websites.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <EditProfileModal />
    <ProfilePictureModal />
</template>
