// import from "dotenv/"
const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.NODEJS_SUPABASE_EMAIL,
    password: process.env.NODEJS_SUPABASE_PASSWORD,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    return;
  }

  console.log("Signed in:", data);

  // // Query data
  // const { data: queryData, error: queryError } = await supabase
  //   .from("accessToken")
  //   .select("*");

  // const { data: queryData, error: queryError } = await supabase
  //   .from("accessToken")
  //   .insert([{ id: "111222333444", created_at: "2024-09-13 06:41:22", token: "11112222333344444" }])
  //   .select('*');

  if (queryError) {
    console.error("Error querying data:", queryError.message);
  } else {
    console.log("Table Data:", queryData);
  }
}

// main();
