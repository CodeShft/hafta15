import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateContact } from "../contacts"

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Ad Soyad</span>
        <input
          placeholder="Ad"
          aria-label="Ad"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Soyad"
          aria-label="Soyad"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Profil URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Github URL</span>
        <input
          placeholder="https://github.com/username"
          aria-label="Github URL"
          type="text"
          name="github"
          defaultValue={contact?.github}
        />
      </label>
      <label>
        <span>Notlar</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Kaydet</button>
        <button type="button">İptal</button>
      </p>
    </Form>
  );
}