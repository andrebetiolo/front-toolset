import Snackbar from 'node-snackbar'
import StringMask from 'string-mask'

/**
* Função com o objetivo de mudar a url independente do framework sendo utilizado no front-end
*
* @param {string} url - URL que deseja ir
*/
export function goToUrl(url) {
  window.location = `${window.location.origin}${url}`;
}

/**
* Função utilizada para poder salvar o valor no localStorage independente do tipo
*
* @param {string} name - Nome do parametro que será buscado no localStorage
* @param {string|object|number} value - Valor que será salvo no localStorage
*/
export function setLocalStorageItem(name, value) {
  typeof (value) === 'object' ? value = JSON.stringify(value) : null
  localStorage.setItem(name, value)
}

/**
* Função utilizada para poder salvar o valor no localStorage independente do tipo
*
* @param {string} name - Nome do parametro que será buscado no localStorage
*/
export function getLocalStorageItem(name) {
  try {
    return JSON.parse(localStorage[name])
  } catch (e) {
    return localStorage[name]
  }
}

/**
* Função utilizada para poder salvar o valor na sessionStorage independente do tipo
*
* @param {String} name - Nome do parametro que será buscado no sessionStorage
* @param {String|Object|Number} value - Valor que será salvo no sessionStorage
*/
export function setSessionStorageItem(name, value) {
  typeof (value) === 'object' ? value = JSON.stringify(value) : null
  sessionStorage.setItem(name, value)
}

/**
* Função utilizada para poder salvar o valor na sessionStorage independente do tipo
*
* @param {String} name - Nome do parametro que será buscado no sessionStorage
*/
export function getSessionStorageItem(name) {
  try {
    return JSON.parse(sessionStorage[name])
  } catch (e) {
    return sessionStorage[name]
  }
}

/**
* Quando se faz o deploy com Cordova ou tecnologia híbridas o protocolo de renderização em aplicativos usa o "file:"
* com isto da de identificar se está sendo renderizado em um aplicativo híbrido ou não
*
* @returns {Boolean} Retorna se o aplicativo está sendo renderizado em por WebView
*/
export function isApp() {
  return window.location.protocol === 'file:'
}

/*
* Valida se a renderização atual da página está sendo feita por um dispositivo mobile
*
* @returns {boolean} Retorna se a página atual está sendo renderizada por um dispositivo mobile
*/
export function isMobile() {
  return navigator.userAgent.toLowerCase().search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|up\.browser|up\.link|webos|wos)/i) !== -1
}

/*
* Valida se a renderização atual da página está sendo feita por desktop
*
* @returns {boolean} Retorna se a pagina atual está sendo renderizada por Desktop
*/
export function isDesktop() {
  return !isMobile()
}

/**
* Função retorna um string de um novo uuid
*
* @returns {String} uuid - Retorna um uuid novo
*/
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
* Função utilizada para enviar eventos para o Google Analytics para poder metrificar alguns eventos
*
* @param {String} name - Nome do parametro que será buscado no localStorage
*/
export function saveEventOnAnalytics(category, actions, label, value) {
  var id = identifyMachine()

  category = category || 'evento'
  actions = actions || id
  label = label || id
  value = value || 0

  if (!isApp() && window.ga) window.ga('send', 'event', category, actions, label, value)
}

/**
* Função utilizada notificar uma mensagem, ela tem a aparencia de uma Snackbar/Toast
*
* @param {String} text - Texto da mensagem
* @param {String} type - Tipo da mensagem, pode ser: success/error/info
*/
export function notify(text, type) {
  let icon
  switch (type) {
    case 'success':
      icon = '<i class="fa fa-check" aria-hidden="true" style="color: #4caf50"></i>'
      break

    case 'error':
      icon = '<i class="fa fa-times-circle" aria-hidden="true" style="color: #f44336"></i>'
      break

    case 'info':
      icon = '<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: #ffeb3b"></i>'
      break

    default:
      icon = ''
      break
  }

  Snackbar.show({ text: `${icon} ${text}`, actionText: "Fechar" });
}

/**
* Função utilizada para formatar as strings de CPF ou CNPJ da aplicação
*
* @param {String} CPForCNPJ - String de um CPF ou CNPJ
* @returns {String} Retorna a string formatada depedendo do tamanho dela
*/
export function formatCPForCNPJ(CPForCNPJ) {
  if (!CPForCNPJ) return

  CPForCNPJ = CPForCNPJ.replace(/\.|-|\//g, '')

  var mask

  switch (CPForCNPJ.length) {
    case 14:
      mask = '00.000.000/0000-00'
      break;

    case 11:
      mask = '000.000.000-00'
      break;

    case 8:
      mask = '00.000.000'
      break;

    case 6:
      mask = '0000-00'
      break;

    default:
      mask = ''
      break;
  }

  return StringMask.apply(CPForCNPJ, mask)
}

/**
* Função que retorna um quantidade de valor formatado
*
* @param {String} value - Valor que será formatado
* @returns {String} Retorna uma string do valor formatado
*/
export function formatValueToCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format(value)
}

/**
* Função que pega uma data em formato americano e transforma para o formato do Brasil
*
* @param {Date} data - Data em string
* @returns {String} Retorna a data formatada
*/
export function formatDateToBRL(date) {
  return new Date(date).toLocaleDateString()
}

/**
* Função que ao receber uma string, um float, ou integer. Retorna uma float formatado com duas casas decimais
*
* @param {string|float|integer} float_number - Valor para ter parceado em um numero com duas casas decimais
* @returns {Float} Retorna o valor formatado
*/
export function formatFloat(float_number) {
  return parseFloat(parseFloat(float_number).toFixed(2))
}

/**
* Função que retorna um id unico baseado na data e hora, quase igual ao uuid, mas menor.
*
* @returns {String} Retorna um id unico
*/
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
* Set a cookie with a ttl time
*
* @returns {Void}
*/
export function setCookie(name, value, time = '30d') {
  typeof (value) === 'object' ? value = JSON.stringify(value) : null
  var d = new Date()
  if (/m/g.test(time)) {
    d.setTime(d.getTime() + (parseInt(time.replace(/\D/g, '')) * 60 * 60 * 1000))
  } else {
    d.setTime(d.getTime() + (parseInt(time.replace(/\D/g, '')) * 24 * 60 * 60 * 1000))
  }
  window.document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`
}

/**
* Get a cookie with a ttl time
*
* @returns {String|Object|Array}
*/
export function getCookie(key) {
  const name = `${key}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      const value = c.substring(name.length, c.length)
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    }
  }
  return ''
}

/**
* Set a cookie key to expire at time of the call of function
*/
export function deleteCookie(name) {
  window.document.cookie = `${name}= ; expires=${new Date().toUTCString()}; path=/`
}

/**
* Return to last visited page
*/
export function goToLastPage() {
  window.history.go(-1)
}

/**
* Remove the accents of the string
*/
export function removeAccents(strToReplace) {
  const stringWithAccents = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ'
  const stringWithoutAccents = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'
  let result = ''
  for (var i = 0; i < strToReplace.length; i++) {
    if (stringWithAccents.indexOf(strToReplace.charAt(i)) != -1) {
      result += stringWithoutAccents.substr(stringWithAccents.search(strToReplace.substr(i, 1)), 1)
    } else {
      result += strToReplace.substr(i, 1)
    }
  }
  return result
}

/**
* Return just the numbers in string
*/
export function justNumbers(string) {
  return string.replace(/\D/g, '')
}

/**
* Validate if the string is a valid CPF document
*/
export function isValidCpf(cpf) {
  cpf = cpf.replace(/\.|-/g, '')
  var soma
  var resto
  var i

  if ((cpf.length != 11) ||
    (cpf == '00000000000') || (cpf == '11111111111') ||
    (cpf == '22222222222') || (cpf == '33333333333') ||
    (cpf == '44444444444') || (cpf == '55555555555') ||
    (cpf == '66666666666') || (cpf == '77777777777') ||
    (cpf == '88888888888') || (cpf == '99999999999')) {
    return false
  }

  soma = 0

  for (i = 1; i <= 9; i++) {
    soma += Math.floor(cpf.charAt(i - 1)) * (11 - i)
  }

  resto = 11 - (soma - (Math.floor(soma / 11) * 11))

  if ((resto == 10) || (resto == 11)) {
    resto = 0
  }

  if (resto != Math.floor(cpf.charAt(9))) {
    return false
  }

  soma = 0

  for (i = 1; i <= 10; i++) {
    soma += cpf.charAt(i - 1) * (12 - i)
  }

  resto = 11 - (soma - (Math.floor(soma / 11) * 11))

  if ((resto == 10) || (resto == 11)) {
    resto = 0
  }

  if (resto != Math.floor(cpf.charAt(10))) {
    return false
  }

  return true
}

/**
* Validate if the string is a valid CNPJ document
*/
export function isValidCnpj(s) {
  s = s.replace(/\.|-|\//g, '')
  var i
  var c = s.substr(0, 12)
  var dv = s.substr(12, 2)
  var d1 = 0

  for (i = 0; i < 12; i++) {
    d1 += c.charAt(11 - i) * (2 + (i % 8))
  }

  if (d1 === 0) return false

  d1 = 11 - (d1 % 11)

  if (d1 > 9) d1 = 0
  if (dv.charAt(0) != d1) {
    return false
  }

  d1 *= 2

  for (i = 0; i < 12; i++) {
    d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8))
  }

  d1 = 11 - (d1 % 11)

  if (d1 > 9) d1 = 0
  if (dv.charAt(1) != d1) {
    return false
  }

  return true
}

/**
* Validate if the string is a valid CPF or CNPJ document
*/
export function isValidCpfOrCnpj(cpf__or_cnpj) {
  let number = cpf__or_cnpj.replace(/\.|-|\//g, '')
  let isValid = false

  if (number.length > 11 && isValidCnpj(number)) {
    isValid = true
  } else {
    if (isValidCpf(number)) {
      isValid = true
    }
  }

  return isValid
}

/**
* Search the CEP in a API and return the object with data
* @returns {Object}
*/
export async function searchCEP(cep) {
  try {
    const r = await window.http.get(`https://viacep.com.br/ws/${cep}/json`)
    return r.data
  } catch (e) {
    return e
  }
}

/**
* Print the HTML in another page
*/
export function printHTML(html = "") {
  const params = 'scrollbars=yes,height=' + screen.height + ',width=' + screen.width + ',fullscreen=yes'
  const w = window.open('', '', params)
  w.document.body.innerHTML = html
  w.document.close()
  w.print()
  w.close()
}

/**
* Print the HTML in another page
* @param {Object}
* @returns {String}
*/
export function objectToURLParams(obj) {
  return Object.entries(obj).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&')
}

/**
* Return object with params of the URL and return a object
* @returns {Object}
*/
export function getURLParams() {
  const urlSplit = window.location.href.split('?');
  const url = urlSplit[1];

  if (!url) {
    return {};
  }

  const params = new URLSearchParams(url)
  const entries = params.entries()

  var obj = {}
  for (let entry of entries) {
    const [key, value] = entry
    obj[key] = value
  }

  return obj
}

/**
* Download async javascript file
* @param {url} string - Url of the script file
* @returns {Promise}
*/
export function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.async = "async";
    script.type = "text/javascript";
    script.src = path;
    script.onload = script.onreadystatechange = (_, isAbort) => {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        if (isAbort)
          reject(Error("Erro ao fazer o download do javascript"));
        else
          resolve();
      }
    };
    script.onerror = () => { reject(); };
    document.querySelector("head").appendChild(script);
  });
}
