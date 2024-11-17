'use client';

import { useState, useTransition } from 'react';
import { submitFormAction } from '../app/actions/submitFormAction';



const Formulaire = () => {
  const [formData, setFormData] = useState({
    civilite: '',
    nomPrenom: '',
    telephone: '',
    pays: '',
    villeRegion: '',
    email: '',
    adresseDomicile: '',
    revenuMensuel: '',
    montantFinancement: '',
    descriptionProjet: '',
    accepteTermes: false,
  });

  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] =useState({})

  const validateClientSide = () => {
    const newErrors = {};

    if (!['Monsieur', 'Madame', 'Mademoiselle'].includes(formData.civilite)) {
      newErrors.civilite = 'Civilité invalide';
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.nomPrenom)) {
      newErrors.nomPrenom = 'Nom et prénom invalide';
    }
    if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse e-mail invalide';
    }
    if (isNaN(formData.revenuMensuel) || formData.revenuMensuel <= 0) {
      newErrors.revenuMensuel = 'Revenu mensuel invalide';
    }
    if (isNaN(formData.montantFinancement) || formData.montantFinancement <= 0) {
      newErrors.montantFinancement = 'Montant du financement invalide';
    }
    if (formData.descriptionProjet.length > 1000) {
      newErrors.descriptionProjet = 'Description trop longue';
    }
    if (!formData.accepteTermes) {
      newErrors.accepteTermes = 'Vous devez accepter les termes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
        civilite: '',
        nomPrenom: '',
        telephone: '',
        pays: '',
        villeRegion: '',
        email: '',
        adresseDomicile: '',
        revenuMensuel: '',
        montantFinancement: '',
        descriptionProjet: '',
        accepteTermes: false,

    })
    if (!validateClientSide()) return;

    startTransition(async () => {
      const response = await submitFormAction(formData);
      if (response.success) {
        alert('Formulaire soumis avec succès');
      } else {
        alert(`Erreur : ${response.error}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[1440px] mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Formulaire de Financement</h2>

      {/* Civilité */}
      <label className="block mb-2">Civilité</label>
      <select
        name="civilite"
        value={formData.civilite}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      >
        <option value="">Sélectionnez...</option>
        <option value="Monsieur">Monsieur</option>
        <option value="Madame">Madame</option>
        <option value="Mademoiselle">Mademoiselle</option>
      </select>

      {/* Nom et prénom */}
      <label className="block mb-2">Nom et prénom</label>
      <input
        type="text"
        name="nomPrenom"
        value={formData.nomPrenom}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Téléphone */}
      <label className="block mb-2">Téléphone</label>
      <input
        type="tel"
        name="telephone"
        value={formData.telephone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Pays */}
      <label className="block mb-2">Pays</label>
      <input
        type="text"
        name="pays"
        value={formData.pays}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Ville/région */}
      <label className="block mb-2">Ville/région</label>
      <input
        type="text"
        name="villeRegion"
        value={formData.villeRegion}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* E-mail */}
      <label className="block mb-2">E-mail</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Adresse du domicile */}
      <label className="block mb-2">Adresse du domicile</label>
      <input
        type="text"
        name="adresseDomicile"
        value={formData.adresseDomicile}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Revenu mensuel */}
      <label className="block mb-2">Revenu mensuel</label>
      <input
        type="number"
        name="revenuMensuel"
        value={formData.revenuMensuel}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Montant du financement */}
      <label className="block mb-2">Montant du financement</label>
      <input
        type="number"
        name="montantFinancement"
        value={formData.montantFinancement}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        required
      />

      {/* Description du projet */}
      <label className="block mb-2">Description de votre projet</label>
      <textarea
        name="descriptionProjet"
        value={formData.descriptionProjet}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-[#cbe6cb]"
        rows="4"
        required
      ></textarea>

      {/* Case à cocher pour les termes */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="accepteTermes"
          checked={formData.accepteTermes}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label>En cochant cette case, vous indiquez que vous avez lu et accepté les termes de ce site Internet.</label>
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="w-full bg-black text-white py-4 rounded hover:bg-black/80" disabled={isPending}>
        {isPending ? 'Envoi en cours...' : 'Soumettre'}
      </button>
    </form>
  );
}

export default Formulaire