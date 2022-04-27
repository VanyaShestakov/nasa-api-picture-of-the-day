document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("data")
    const date = localStorage.getItem("date")
    if (data && date) {
        updateData(JSON.parse(data))
        setDate(date)
    } else {
        setDate(Date.now())
        loadData(document.getElementById("dateInput").value)
    }
})

document.getElementById("searchForm").addEventListener("submit", () => {
    document.getElementById("contentLoader").style.display = "flex"
    document.getElementById("content").style.display = "none"
    document.getElementById("contentError").style.display = "none"
    const date = document.getElementById("dateInput").value
    loadData(date)
    setDate(date)
})

const updateData = (data) => {
    let elem
    if (data.code == 400) {
        document.getElementById("contentLoader").style.display = "none"
        document.getElementById("contentError").style.display = "flex"
    } else {
        elem = document.getElementById("imgOfDay")
        elem.attributes.src.value = data.url
        elem.classList.add("active")
        document.getElementById("title").innerText = data.title
        document.getElementById("description").innerText = data.explanation
        document.getElementById("contentLoader").style.display = "none"
        document.getElementById("content").style.display = "flex"
    }
}

const loadData = (date) => {
    document.getElementById("connectionError").style.display = "none"
    fetch(`https://api.nasa.gov/planetary/apod?api_key=AxeblXxeEPDiaf1VFgWtGAyTx2CqWgxB39nO9uVe&date=${date}`)
        .then((response) => {
            return response.json()
        })
        .catch(() => {
            offlineHandler()
        })
        .then((data) => {
            if (data) {
                localStorage.setItem("data", JSON.stringify(data))
                localStorage.setItem("date", document.getElementById("dateInput").value)
                updateData(data)
            }
        })
}

const setDate = (date) => {
    const d = new Date(date)
    document.getElementById("dateInput").valueAsDate = d
    document.getElementById("date").innerHTML = "Picture of <br>" + d.toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    })
}

const offlineHandler = () => {
    document.getElementById("title").innerText = ""
    document.getElementById("description").innerText = ""
    document.getElementById("contentLoader").style.display = "none"
    document.getElementById("connectionError").style.display = "flex"
}