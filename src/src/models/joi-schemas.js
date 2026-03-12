import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const BankSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Blackbank"),
    date: Joi.string().required().example("dd-mm-yyyy"),
    other: Joi.string().required().example("1 in flight"),
    placeid: IdSpec,
  })
  .label("Bank");

export const BankSpecPlus = BankSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("BankPlus");

export const BankArraySpec = Joi.array().items(BankSpecPlus).label("BankArray");

export const PlaceSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Bray Harbour"),
    userid: IdSpec,
    banks: BankArraySpec,
  })
  .label("Place");

export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacePlus");

export const PlaceArraySpec = Joi.array().items(PlaceSpecPlus).label("PlaceArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");


