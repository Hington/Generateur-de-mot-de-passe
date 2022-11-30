let ecranPlat = document.querySelector("#ecran")
let copyPlat = document.querySelector(".copy")
let longueurPlat = document.querySelector("#longueur")
let majusculePlat = document.querySelector("#majuscule")
let minusculePlat = document.querySelector("#minuscule")
let nombresPlat = document.querySelector("#nombres")
let symbolesPlat = document.querySelector("#symboles")
let btnPlat = document.querySelector(".btn")

function retourneMajuscules() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function retourneMinuscules() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function retourneNombres() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 49)
}
function retourneSymboles() {
    const symboles = '!@#$%^&*(){}[]=<>/,.'
    return symboles[Math.floor(Math.random() * symboles.length)]
}

const renvoieFunct = {
    majusculeMDP :retourneMajuscules,
    minusculeMDP : retourneMinuscules,
    nombreMDP : retourneNombres,
    symboleMDP : retourneSymboles
}

btnPlat.addEventListener('click',()=>{
        let longueurs = +longueurPlat.value
        let majuscules = majusculePlat.checked
        let minuscules = minusculePlat.checked
        let nombres = nombresPlat.checked
        let symboles = symbolesPlat.checked

        ecranPlat.innerText = AffichageMotDePasseGenerer(longueurs, majuscules, minuscules,nombres,symboles)
    })

function AffichageMotDePasseGenerer(longueurMDP, majusculeMDP, minusculeMDP,nombreMDP,symboleMDP) {
    let recoisConcat = '';

    let nombreCaseCocher = majusculeMDP + minusculeMDP + nombreMDP + symboleMDP

    let arryCaseCocher =[{majusculeMDP},{minusculeMDP},{nombreMDP},{symboleMDP}].filter(filtreValeurTrue =>Object.values(filtreValeurTrue)[0])

    if (nombreCaseCocher === 0) {
        return ''
    }

    if (longueurMDP === 0 || longueurMDP >20 || longueurMDP< 4) {
       alert('La longueur du mot de passe n\'a pas été respecté')
    }else{
        for (let i = 0; i < longueurMDP; i+=nombreCaseCocher ) {
            arryCaseCocher.forEach(item => {
                let FuncName = Object.keys(item)[0]
                recoisConcat += renvoieFunct[FuncName]();
            });
        }
    }
    let finalPassword = recoisConcat.slice(0,longueurMDP)

    return finalPassword
}

copyPlat.addEventListener('click',()=>{
    // creer un textarea
    const textarea = document.createElement('textarea')
    // attribution de la valeur de l'ecran a la variable password
    const password = ecranPlat.innerText
    // si password es vide on retourne de vide
    if (!password) {
        return
    }
    // sinon textarea prendra la valeur de password
    textarea.value = password
    // on creer un élement enfant dans le body qui es textarea
    document.body.appendChild(textarea)
    // on selection textarea
    textarea.select()
    // on execute la commande copy
    document.execCommand('copy')
    // on supprime textarea
    textarea.remove()
    // on envoie une alerte
    alert('Merci de m\'avoir copier')
})

