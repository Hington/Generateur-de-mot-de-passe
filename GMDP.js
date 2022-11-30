let longueurELT = document.querySelector('#longueur')
let minusculeELT = document.querySelector('#minuscule')
let majusculeELT = document.querySelector('#majuscule')
let nombresELT = document.querySelector('#nombres')
let symbolesELT = document.querySelector('#symboles')
let generateurELT = document.querySelector('Button')
let ecranELT = document.querySelector('#ecran')
let copyELT = document.querySelector('.copy')

// creaction des fonction qui vont me retourné des nombres aléatoire
function obtenirLettreMajuscule()
 {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function obtenirLettreMinuscule()
 {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function obtenirNombre()
{
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function obtenirsymboles()
{
    const symboles = '!@#$%^&*(){}[]=<>/,.'
    return symboles[Math.floor(Math.random() * symboles.length)]
}
// fin

// creaction d'un objet qui aura comme valeur le return de la fonction précédent
const renvoieFunction ={
    majuscule: obtenirLettreMajuscule,
    minuscule: obtenirLettreMinuscule,
    nombres: obtenirNombre,
    symboles: obtenirsymboles
}
// fin

// lorsqu'on click sur le btn generateur de mot de passe
generateurELT.addEventListener('click', ()=>{
    // longueurMDP prend la valeur du nombre
    const longueurMDP = +longueurELT.value
    // majusculeMDP prend la valeur true ou false (cocher ou décocher)
    const majusculeMDP = majusculeELT.checked
    // minusculeMDP  prend la valeur true ou false (cocher ou décocher)
    const minusculeMDP = minusculeELT.checked
    // nombresMDP prend la valeur true ou false (cocher ou décocher)
    const nombresMDP = nombresELT.checked
    // symbolesMDP prend la valeur true ou false (cocher ou décocher)
    const symbolesMDP = symbolesELT.checked
    // ecranELT.innerText prendra le resultat de la fonction generateursMDPasse avec pour paramètre majusculeMDP,minusculeMDP,nombresMDP,symbolesMDP,longueurMDP
    ecranELT.innerText = generateursMDPasse(
        majusculeMDP,
        minusculeMDP,
        nombresMDP,
        symbolesMDP,
        longueurMDP
        )
})
// fin

// cette function me renvoie le resultat final
function generateursMDPasse(majuscule,minuscule,nombres,symboles,longueurMDP) {
    // déclaration d'une variable
    let generateurMotDP = '';
    // verifier le nombre d'element true (cocher)
    let verificationVraiOuFaux = majuscule + minuscule + nombres + symboles

    // verification si les paramettre de la function renvoie true ou false (cocher ou décocher),
    // le .filter(item => Object.values(item)[0]) filtre les élements et retire les élements qui son faux
    // tableauVerificationVraiOuFaux est un trableau qui renferme un objet qui a pour keys 'majuscule,minuscule,nombres,symboles' et valeur (true ou false)
    let tableauVerificationVraiOuFaux = [{majuscule},{minuscule},{nombres},{symboles}].filter(item => Object.values(item)[0])

    // nous verifions si le nombre d'élement true (cocher) égale 0 alors on retourne le vide
    if (verificationVraiOuFaux === 0) {
        return '';
    }
    // sinon on fait une boucle qui verifi si la variable i < au nombre que nous avont entrer dans la longueur du mot de passe


    for (let i = 0; i < longueurMDP; i+=verificationVraiOuFaux) {
         // si oui on parcoure notre tableau avec le foreach
        tableauVerificationVraiOuFaux.forEach(TVF => {
        // la variable fonctionName se vera attribué les keys de notre tableauVerificationVraiOuFaux
            const fonctionName = Object.keys(TVF)[0];
        // on concatène la valeur de generateurMotDP + renvoieFunction[fonctionName]()
        // (fonctionName vas retourner majuscule,minuscule,nombres,symboles) alors nous aurons renvoieFunction.majuscule() qui vas retourné la fonction des nombres aléatoire
            generateurMotDP += renvoieFunction[fonctionName]();
        });
    }
    // si longueurMDP = 2 alors nous devons voir 2 caractère .... donc on supprime le surplus
    let finalPassword = generateurMotDP.slice(0, longueurMDP);
    // on renvoie la valeur finale
    return finalPassword
}
// fin

// fonction copy
copyELT.addEventListener('click',()=>{
    // creer un textarea
    const textarea = document.createElement('textarea')
    // attribution de la valeur de l'ecran a la variable password
    const password = ecranELT.innerText
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
    alert('Merci de l\'avoir copier')
})
// fin

