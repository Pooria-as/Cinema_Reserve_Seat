const SeatContainer = document.querySelector(".SeatContainer")
//get free seat
const FreeSeat = document.querySelectorAll(".row .seat:not(occupied)")
const count = document.getElementById("count")
const totalPrice = document.getElementById("total")
const Movies = document.getElementById("Movies")
let MovieTicketPrice = +Movies.value;

const SaveData = (MovieSelected, MoviePrice) => {
    localStorage.setItem('MovieSelected', MovieSelected)
    localStorage.setItem('MoviePrice', MoviePrice)
}


const UpdateCountPrice = () => {
    const selectedSeat = document.querySelectorAll(".row .seat.selected")

    const Seatnumber = [...selectedSeat].map((seat) =>
        [...FreeSeat].indexOf(seat)
    )
    localStorage.setItem("seats_numbers", JSON.stringify(Seatnumber))

    const SeatLenght = selectedSeat.length
    count.innerText = SeatLenght
    totalPrice.innerHTML = SeatLenght * MovieTicketPrice

}




Movies.addEventListener("change", (e) => {
    MovieTicketPrice = +e.target.value
    console.log(MovieTicketPrice);
    console.log(e.target.selectedIndex)
    SaveData(e.target.selectedIndex, MovieTicketPrice)
    UpdateCountPrice()
})


SeatContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")
        UpdateCountPrice();
    }
})

//Get Data From LocalStorage


const GetDataFromLocalSotrage = () => {
    const seats_selected = localStorage.getItem('seats_numbers')
    // console.log(seats_selected);

    if (seats_selected !== null) {
        FreeSeat.forEach((seat, index) => {
            if (seats_selected.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    UpdateCountPrice()

}

GetDataFromLocalSotrage()