import axios from 'axios'
(async function main() {
    const res = await axios.get(
        'https://sis.jhu.edu/api//classes/Whiting%20School%20of%20Engineering%20Programs%20for%20Professionals/PE%20Computer%20Science/current?key=HU86bHdqJaIM6Kr7vHwMfaIfJUKIDf0j'
    )
    const array = res.data
    const filtered = array.filter(
        (v, i, a) => a.findIndex((t) => t.OfferingName === v.OfferingName) === i
    )
    console.log(filtered)
}())