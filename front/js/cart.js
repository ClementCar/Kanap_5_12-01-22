// récupere la section du panier 
const $cart__items = document.getElementById('cart__items')

// Afficher le produit via l'API
const showApiProduct = product => {
    const $productArticle = document.createElement('article')
    $productArticle.classList.add('cart__item')
    $productArticle.setAttribute('data-id', `${product._id}`)
}