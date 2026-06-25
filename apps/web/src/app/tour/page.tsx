import { redirect } from "next/navigation";

export default function LegacyTourIndexRedirect() {
  redirect("/tours");
}
