export const ArrDate = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
export const ArrMonth = [1,2,3,4,5,6,7,8,9,10,11,12]

export const ArrYear = []
function arrYear() {
    const currentYear = new Date().getFullYear()
    for(var i=currentYear; i >= 1900; i--) {
        ArrYear.push(i)
    }
}
arrYear()


