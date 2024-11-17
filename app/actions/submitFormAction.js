'use server';
import prisma from '../../lib/prisma'
import validator from 'validator';

export async function submitFormAction(formData) {
    try {
      // Validation côté serveur
      if (!['Monsieur', 'Madame', 'Mademoiselle'].includes(formData.civilite)) {
        throw new Error('Civilité invalide');
      }
      if (!validator.isAlpha(formData.nomPrenom.replace(/ /g, ''), 'fr-FR')) {
        throw new Error('Nom et prénom invalide');
      }
      if (!validator.isMobilePhone(formData.telephone, 'any')) {
        throw new Error('Numéro de téléphone invalide');
      }
      if (!validator.isEmail(formData.email)) {
        throw new Error('Adresse e-mail invalide');
      }
      if (!validator.isFloat(formData.revenuMensuel.toString(), { min: 0 })) {
        throw new Error('Revenu mensuel invalide');
      }
      if (!validator.isFloat(formData.montantFinancement.toString(), { min: 0 })) {
        throw new Error('Montant du financement invalide');
      }
      if (formData.descriptionProjet.length > 1000) {
        throw new Error('Description trop longue');
      }
  
      // Échapper et normaliser les entrées
      const sanitizedData = {
        civilite: formData.civilite,
        nomPrenom: validator.escape(formData.nomPrenom),
        telephone: validator.escape(formData.telephone),
        pays: validator.escape(formData.pays),
        villeRegion: validator.escape(formData.villeRegion),
        email: validator.normalizeEmail(formData.email),
        adresseDomicile: validator.escape(formData.adresseDomicile),
        revenuMensuel: parseFloat(formData.revenuMensuel),
        montantFinancement: parseFloat(formData.montantFinancement),
        descriptionProjet: validator.escape(formData.descriptionProjet),
        accepteTermes: formData.accepteTermes === 'true' || formData.accepteTermes === true,
      };
  
      // Insérer les données dans la base de données
      const newEntry = await prisma.financement.create({
        data: sanitizedData,
      });
  
      return { success: true, data: newEntry };
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      return { success: false, error: error.message || 'Une erreur est survenue lors de la soumission' };
    } finally {
      await prisma.$disconnect();
    }
  }