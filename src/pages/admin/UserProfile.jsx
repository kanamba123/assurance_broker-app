import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    // Données simulées
    const mockUser = {
        id: '123',
        avatar: 'data:image/png;base64,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',
        name: 'NISHIMAGIZWE Rube ',
        email: 'rnishimagizwe@example.com',
        role: 'Administrateur',
        phone: '+257 69 249 799',
        bio: 'Développeur full-stack passionné par les nouvelles technologies.',
        joinDate: '15/06/2025',
        lastLogin: 'Aujourd\'hui, 14:30',
        stats: {
            projects: 24,
            tasksCompleted: 128,
            connections: 42
        },
        skills: ['React', 'Node.js', 'TypeScript', 'UI/UX'],
        socialLinks: {
            twitter: 'https://twitter.com/nishigagizwe',
            linkedin: 'https://linkedin.com/in/rubennish',
            github: 'https://github.com/rubenn'
        }
    };

    // Fusion des données réelles et simulées
    const profileData = {
        ...mockUser,
        ...user,
        name: user?.name || mockUser.name,
        email: user?.email || mockUser.email
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50   sm:px-6 lg:px-8">
            <div className=" mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour
                </button>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header du profil */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32 relative">
                        <div className="absolute -bottom-16 left-6">
                            <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                                <img
                                    src={profileData.avatar}
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section principale */}
                    <div className="pt-20 px-6 pb-6">
                        <div className="flex justify-end mb-6">
                            {isEditing ? (
                                <div className="space-x-3">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Modifier le profil
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Colonne de gauche */}
                            <div className="md:col-span-2">
                                {isEditing ? (
                                    <form className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                            <textarea
                                                name="bio"
                                                rows="4"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            ></textarea>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                                        <p className="text-orange-500 mt-1">{profileData.role}</p>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-gray-700">{profileData.email}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-gray-700">{profileData.phone}</span>
                                            </div>

                                            <div className="flex items-start">
                                                <svg className="w-5 h-5 text-gray-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <p className="text-gray-700">{profileData.bio}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Colonne de droite */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-3">Statistiques</h3>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-orange-500">{profileData.stats.projects}</p>
                                            <p className="text-xs text-gray-500">Projets</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-orange-500">{profileData.stats.tasksCompleted}</p>
                                            <p className="text-xs text-gray-500">Tâches</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-orange-500">{profileData.stats.connections}</p>
                                            <p className="text-xs text-gray-500">Contacts</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-3">Compétences</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.skills.map((skill, index) => (
                                            <span key={index} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-3">Réseaux sociaux</h3>
                                    <div className="space-y-2">
                                        {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-orange-500 hover:text-orange-600"
                                            >
                                                <span className="capitalize mr-2">{platform}</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;