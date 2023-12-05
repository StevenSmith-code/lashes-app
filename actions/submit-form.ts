"use server";

export const create = async (formData: FormData) => {
  console.log(formData.get("classic"));
};
