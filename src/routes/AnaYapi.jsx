import { NavLink, Outlet, useLoaderData, Form, redirect, useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);;
}

export default function AnaYapi() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Rehber</h1>

        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>

          <Form method="post">
            <button type="submit">Yeni</button>
          </Form>
        </div>

        <nav>
          <ul>

            <li>
              <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    } to={"/"}>Ana ekran</NavLink>
            </li>

            {contacts.length ? (
              <>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink className={ ({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : "" } to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>İsim yok</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </>
            ) : (
              <p>
                <i>Kişi bulunamadı..</i>
              </p>
            )}
          </ul>
        </nav>
      </div>

      <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }>
          {navigation.state === "loading" ? "Yükleniyor" : ""}

          <Outlet />
      </div>
    </>
  );
}
