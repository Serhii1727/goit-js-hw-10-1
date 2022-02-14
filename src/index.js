import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import template from './template.hbs'
import fetchCountries from './fetchCountries'
import template2 from './template2.hbs'


const countriesList = document.querySelector('.country-list')
const input = document.querySelector('#search-box')
const countryDetails = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;
input.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY))


function onInputType(event) {
    let countryName = event.target.value
    let trimCountry = countryName.trim()

    if (!countryName) {
        countriesListInnerHTML('')
        countryDetailsInnerHTML("")
    } else {
        fetchCountries(trimCountry).then(renderCountriesList).catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        })

    }
}


function renderCountriesList(country) {
    console.log(country)

    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
    if (country.length >= 2 && country.length <= 10) {
        const markup = template(country)
        countriesListInnerHTML(markup)
        countryDetailsInnerHTML("")

    }
    if (country.length === 1) {

        const detailsMarkup = template2(country)

        countriesListInnerHTML("")
        countryDetailsInnerHTML(detailsMarkup)

    }

}

function countriesListInnerHTML(param) {
    return countriesList.innerHTML = param

}

function countryDetailsInnerHTML(param) {
    return countryDetails.innerHTML = param
}