document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.querySelector('.card-list')

    let page = 1
    let loading = false
    const photos = []
    let total = 0

    const cardComponent = (props) => {
        return `<li class="card">
                    <div class="card__img">
                        <img src="${props.thumbnailUrl}" alt="${props.title}">
                    </div>
                    <p class="card__description">${props.title}</p>
                </li>`
    }

    const renderPhotos = (data) => {
        data.forEach(el => {
            cardList.insertAdjacentHTML('beforeend', cardComponent(el))
        })
    }

    const scrollHandler = async (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < total) {
            if(!loading) {
                loading = true
                await fetchData()
                loading = false
            }
        }
    }

    const fetchData = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20&_page=${page}`)
        total = response.headers.get('x-total-count')
        photos.push(...await response.json())
        page++
        renderPhotos(photos)
    }
    fetchData()
    
    document.addEventListener('scroll', scrollHandler)

})