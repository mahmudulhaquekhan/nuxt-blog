const useModal = ({
    id
} : {
    id: string
}) => {

    const status = computed(() => modals.value.includes(id));

    const show = () => {
        !status.value ? modals.value = [...modals.value, id] : null;
    }

    const close = () => {
        status.value ? modals.value = modals.value.filter(i => i !== id) : null;
    }

    return {
        status,
        show,
        close,  
    }
}


const modals = ref<string[]>([]);

export default useModal;