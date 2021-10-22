// Regex

export const validName = new RegExp('^[A-Za-zÀ-ÿ-s]{3,20}$')

export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
)
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$')

export const validMessage = new RegExp('^.{2,}$')
