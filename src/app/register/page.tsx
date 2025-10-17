"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Country {
  cca2: string;
  name: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  dialCode: string;
}

export default function RegisterPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    countryCode: "+961",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca2,name,idd",
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();

        if (!Array.isArray(data)) {
          setCountries([]);
          return;
        }

        const valid: Country[] = data
          .filter(
            (c: any) =>
              c.idd &&
              typeof c.idd.root === "string" &&
              Array.isArray(c.idd.suffixes) &&
              c.idd.suffixes.length > 0
          )
          .map((c: any) => ({
            cca2: c.cca2,
            name: c.name?.common ?? "Unknown",
            idd: c.idd,
            dialCode: `${c.idd.root}${c.idd.suffixes[0]}`,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(valid);

        const defaultCountry = valid.find((c) => c.cca2 === "LB");
        if (defaultCountry) {
          setFormData((prev) => ({
            ...prev,
            countryCode: defaultCountry.dialCode,
          }));
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050B1F] px-6 py-12 text-[#C7D8E7]">
      <div className="w-full max-w-md space-y-8 bg-[#0A1533] border border-[#122E76]/40 rounded-2xl shadow-lg shadow-[#122E76]/20 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#C7D8E7]">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-[#A9BCCC]">
            Or{" "}
            <a
              href="#"
              className="font-medium text-[#5C8AAC] hover:text-[#122E76] transition-colors"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Phone Number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                disabled={loading}
                className="rounded-l-md bg-[#050B1F] border border-[#122E76]/40 text-[#C7D8E7] px-3 py-3 w-[150px] overflow-hidden text-ellipsis focus:outline-none focus:ring-2 focus:ring-[#5C8AAC]"
              >
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  countries.map((country) => (
                    <option key={country.cca2} value={country.dialCode}>
                      {country.cca2} ({country.dialCode})
                    </option>
                  ))
                )}
              </select>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 rounded-r-md bg-[#050B1F] border border-l-0 border-[#122E76]/40 px-3 py-3 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[#A9BCCC] mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md bg-[#050B1F] border border-[#122E76]/40 px-3 py-3 text-[#C7D8E7] placeholder-[#7D8EA5] focus:outline-none focus:ring-2 focus:ring-[#5C8AAC]"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md font-semibold text-[#050B1F] bg-[#5C8AAC] hover:bg-[#122E76] hover:text-[#C7D8E7] transition-all duration-300 shadow-md shadow-[#5C8AAC]/30 hover:shadow-[#122E76]/40"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-sm text-center mt-4">
          <span className="text-[#A9BCCC]">Already have an account? </span>
          <Link
            href="/login"
            className="font-medium text-[#5C8AAC] hover:text-[#122E76] transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
