const useModal = ({
    id
} : {
    id: string
}) => {

    const status = computed(() => modals.value.includes(id));

    const show = (data: any = null) => {
        !status.value ? modals.value = [...modals.value, id] : null;

        if(data) {
            modalData.value = 
            {...modalData.value, 
                [id]: data
            };
        }
    }

    const close = () => {
        status.value ? modals.value = modals.value.filter(i => i !== id) : null;

        if(modalData.value && modalData.value[id]) {
            modalData.value = 
            {...modalData.value, 
                [id]: null
            };
        }
    }


    const getData = () => {
        return modalData.value ? modalData.value[id] : null;
    };

    return {
        status,
        show,
        close,
        getData
    }
}


const modals = ref<string[]>([]);
const modalData = ref<any>({});

export default useModal;