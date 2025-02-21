import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErr.js";

const bfhlPost = asyncHandler(async (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    throw new ApiError(400, "Invalid input: 'data' field is required");
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet = alphabets.length
    ? [alphabets.sort().reverse()[0]]
    : [];

  return res.status(200)
  .json(
    {
      user_id: "Amit_26112004",
      email: "baghlaamit06@gmail.com",
      roll_number: "2237119",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    },
  );
});

const bfhlGet = asyncHandler(async (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

export { bfhlPost, bfhlGet };
