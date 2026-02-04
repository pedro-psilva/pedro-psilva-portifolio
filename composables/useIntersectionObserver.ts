import { onMounted, onUnmounted, ref } from 'vue';

export function useIntersectionObserver(threshold = 0.1) {
    const isVisible = ref(false);
    const elementRef = ref<HTMLElement | null>(null);

    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        if (!elementRef.value) return;

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer?.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(elementRef.value);
    });

    onUnmounted(() => {
        observer?.disconnect();
    });

    return { elementRef, isVisible };
}
