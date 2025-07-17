-- Table des utilisateurs (administrateurs/courtiers)
CREATE TABLE insurance_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    NIF VARCHAR(14) UNIQUE,
    Registre_com VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    postal_code VARCHAR(10),
    city VARCHAR(50),
    country VARCHAR(50) DEFAULT 'France',
    contact_person VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    commission_rate DECIMAL(5,2) DEFAULT 15.00, -- Taux de commission par défaut
    payment_terms VARCHAR(255), -- Modalités de paiement
    contract_start_date DATE,
    contract_end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    logo_path VARCHAR(200)  NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'courtier', 'gestionnaire', 'client', 'partenaire') DEFAULT 'courtier',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    insurance_company_id INT NULL,
    status ENUM('activé', 'désactivé') DEFAULT 'activé',
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (insurance_company_id) REFERENCES insurance_companies(id)
);

-- Table des documents
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('client', 'contract', 'claim', 'quote') NOT NULL,
    entity_id INT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT NOT NULL,
    description TEXT,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);


-- Nouvelle table pour les catégories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table des types d'assurance
CREATE TABLE insurance_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id INT NOT NULL,
    company_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id)
);

--  table  customers
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    civility ENUM('MR', 'Mme', 'Mlle','Personne morale') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address_line1 TEXT,
    address_line2 TEXT,
    postal_code VARCHAR(10),
    city VARCHAR(50),
    country VARCHAR(50) DEFAULT 'BURUNDI',
    marital_status ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'),
    profession VARCHAR(100),
    tax_id VARCHAR(50), -- Numéro fiscal
    kyc_status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    marketing_consent BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_name (last_name, first_name),
    INDEX idx_customer_email (email)
);

-- Nouvelle table pour les contacts clients (optionnel)
CREATE TABLE customer_contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    contact_type ENUM('PRIMARY', 'SECONDARY', 'EMERGENCY', 'FAMILY') NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    relationship VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    is_authorized BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
-- Table des contrats
CREATE TABLE contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    type_id INT NOT NULL,
    reference VARCHAR(50) UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    premium DECIMAL(10,2) NOT NULL,
    payment_frequency ENUM('Mensuel', 'Trimestriel', 'Semestriel', 'Annuel') DEFAULT 'Mensuel',
    status ENUM('En attente', 'Actif', 'Résilié', 'Expiré') DEFAULT 'En attente',
    documents_path TEXT,
    notes TEXT,
    company_id INT NOT NULL,
    created_by INT NOT NULL,
    is_commission_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commission_rate DECIMAL(5,2),
    commission_calculated BOOLEAN DEFAULT FALSE,
    commission_amount DECIMAL(10,2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES insurance_types(id),
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
CREATE TABLE commissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    company_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL, -- Montant de la commission
    commission_rate DECIMAL(5,2) NOT NULL, -- Taux appliqué
    calculation_base DECIMAL(10,2) NOT NULL, -- Base de calcul (montant prime)
    status ENUM('pending', 'confirmed', 'paid', 'cancelled') DEFAULT 'pending',
    expected_payment_date DATE,
    actual_payment_date DATE,
    payment_reference VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id),
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id)
);
-- Table des documents clients
CREATE TABLE customer_documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    document_type ENUM('ID_PROOF', 'PROOF_OF_ADDRESS', 'TAX_FORM', 'CONTRACT') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated BOOLEAN DEFAULT FALSE,
    validation_date TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_document_type (document_type)
);
CREATE TABLE company_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    type_id INT NOT NULL,
    product_code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    garanties TEXT NULL,
    terms_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id),
    FOREIGN KEY (type_id) REFERENCES insurance_types(id),
    UNIQUE (company_id, product_code)
);

CREATE TABLE quotes (
    quote_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT, -- client existant (optionnel)
    type_id INT NOT NULL, -- type d'assurance (clé étrangère vers insurance_types)
    reference VARCHAR(50) UNIQUE NOT NULL, -- référence du devis (ex: QTE-001)
    amount DECIMAL(10,2) NOT NULL, -- montant estimé
    validity_date DATE NOT NULL, -- date de validité
    status ENUM('Brouillon', 'Envoyé', 'Accepté', 'Refusé', 'Expiré') DEFAULT 'Brouillon',
    notes TEXT, -- message complémentaire du client
    created_by INT NOT NULL, -- utilisateur qui a saisi le devis (courtier)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES insurance_types(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);


CREATE TABLE souscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    police_id INT NOT NULL,
    date_souscription DATE NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    duree INT NOT NULL,
    mode_paiement VARCHAR(50) NOT NULL,
    etat VARCHAR(50) DEFAULT 'en attente',
    piece_identite VARCHAR(255) DEFAULT NULL ,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (police_id) REFERENCES company_products(id)
);

CREATE TABLE souscription_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    souscription_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (souscription_id) REFERENCES souscriptions(id) ON DELETE CASCADE
);

-- Table des règles de commission
CREATE TABLE commission_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    product_id INT,
    name VARCHAR(100) NOT NULL,
    calculation_type ENUM('fixed', 'percentage', 'tiered') NOT NULL,
    base_value DECIMAL(10,2),
    min_threshold DECIMAL(10,2),
    max_threshold DECIMAL(10,2),
    valid_from DATE NOT NULL,
    valid_to DATE,
    priority INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id),
    FOREIGN KEY (product_id) REFERENCES company_products(id)
);

-- Table des tranches de commission
CREATE TABLE commission_tiers (
    tier_id INT AUTO_INCREMENT PRIMARY KEY,
    rule_id INT NOT NULL,
    min_amount DECIMAL(10,2) NOT NULL,
    max_amount DECIMAL(10,2),
    rate DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (rule_id) REFERENCES commission_rules(id)
);
-- Table des sinistres
CREATE TABLE claims (
    claim_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    claim_date DATE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2),
    status ENUM('Déclaré', 'En cours', 'Accepté', 'Refusé', 'Indemnisé', 'clôturé') DEFAULT 'Déclaré',
    decision_date DATE,
    decision_notes TEXT,
    processed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    declaration_method ENUM('en ligne', 'papier') DEFAULT 'en ligne', -- Nouveau champ
    documents_path TEXT, -- Chemin pour les documents joints
    FOREIGN KEY (contract_id) REFERENCES contracts(id),
    FOREIGN KEY (processed_by) REFERENCES users(id)
);


-- Table des devis
CREATE TABLE quotes (
    quote_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    type_id INT NOT NULL,
    reference VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    validity_date DATE NOT NULL,
    status ENUM('Brouillon', 'Envoyé', 'Accepté', 'Refusé', 'Expiré') DEFAULT 'Brouillon',
    notes TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES insurance_types(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Table des paiements
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    method ENUM('Carte', 'Prélèvement', 'Virement', 'Chèque', 'Espèces', 'Mobile Money') NOT NULL,
    status ENUM('En attente', 'Validé', 'Refusé', 'Remboursé') DEFAULT 'En attente',
    reference VARCHAR(100),
    notes TEXT,
    recorded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- automatisation  Procédure stockée pour le calcul des commissions
DELIMITER //
CREATE PROCEDURE CalculateCommission(IN contract_id_param INT)
BEGIN
    DECLARE base_amount DECIMAL(10,2);
    DECLARE rate DECIMAL(5,2);
    DECLARE commission DECIMAL(10,2);
    DECLARE company_id_val INT;
    
    -- Récupération des données du contrat
    SELECT c.premium, c.commission_rate, c.id
    INTO base_amount, rate, company_id_val
    FROM contracts c
    WHERE c.id = contract_id_param;
    
    -- Calcul de la commission
    SET commission = base_amount * (rate / 100);
    
    -- Mise à jour du contrat
    UPDATE contracts 
    SET commission_amount = commission,
        commission_calculated = TRUE
    WHERE id = contract_id_param;
    
    -- Création de l'enregistrement de commission
    INSERT INTO commissions (id, company_id, amount, commission_rate, calculation_base, status)
    VALUES (contract_id_param, company_id_val, commission, rate, base_amount, 'pending');
END //
DELIMITER ;

-- 3. Déclencheur automatique
DELIMITER //
CREATE TRIGGER after_contract_insert
AFTER INSERT ON contracts
FOR EACH ROW
BEGIN
    -- Appel automatique de la procédure de calcul
    CALL CalculateCommission(NEW.id);
END //
DELIMITER ;

-- 4. Fonction de vérification des commissions (pour l'interface PHP)

DELIMITER //
CREATE FUNCTION CheckCommissionStatus(contract_id_param INT) 
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE status_val VARCHAR(20);
    
    SELECT status INTO status_val
    FROM commissions
    WHERE id = contract_id_param
    LIMIT 1;
    
    RETURN IFNULL(status_val, 'not_found');
END //
DELIMITER ;

CREATE TABLE analytics_commissions (
    fact_id INT AUTO_INCREMENT PRIMARY KEY,
    date_id DATE NOT NULL,
    company_id INT NOT NULL,
    product_id INT,
    user_id INT,
    contract_id INT,
    amount DECIMAL(12,2) NOT NULL,
    fees DECIMAL(12,2) NOT NULL,
    net_amount DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'paid', 'cancelled') NOT NULL,
    payment_gateway VARCHAR(20),
    days_to_payment INT,
    INDEX idx_date (date_id),
    INDEX idx_company (company_id),
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id),
    FOREIGN KEY (product_id) REFERENCES company_products(id)
);
CREATE TABLE analytics_dim_date (
    date_id DATE PRIMARY KEY,
    day INT NOT NULL,
    month INT NOT NULL,
    quarter INT NOT NULL,
    year INT NOT NULL,
    day_of_week INT NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    is_holiday BOOLEAN DEFAULT FALSE
);
CREATE TABLE analytics_kpis (
    kpi_id INT AUTO_INCREMENT PRIMARY KEY,
    date_id DATE NOT NULL,
    company_id INT,
    user_id INT,
    total_commissions DECIMAL(12,2) NOT NULL,
    paid_commissions DECIMAL(12,2) NOT NULL,
    pending_commissions DECIMAL(12,2) NOT NULL,
    avg_payment_days DECIMAL(5,2) NOT NULL,
    conversion_rate DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (date_id) REFERENCES analytics_dim_date(date_id)
);
-- Table des paiements en ligne
CREATE TABLE online_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    commission_id INT NOT NULL,
    gateway ENUM('stripe', 'paypal', 'e_noti', 'lumicash') NOT NULL,
    transaction_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    fees DECIMAL(10,2) NOT NULL,
    net_amount DECIMAL(10,2) NOT NULL,
    currency CHAR(3) DEFAULT 'EUR',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    metadata JSON,
    FOREIGN KEY (commission_id) REFERENCES commissions(id)
);
-- Procédure ETL (Extract-Transform-Load)
DELIMITER //
CREATE PROCEDURE RefreshAnalyticsData()
BEGIN
    -- Mise à jour de la table des dates
    INSERT INTO analytics_dim_date (date_id, day, month, quarter, year, day_of_week, is_weekend)
    SELECT 
        date_field,
        DAY(date_field),
        MONTH(date_field),
        QUARTER(date_field),
        YEAR(date_field),
        DAYOFWEEK(date_field),
        DAYOFWEEK(date_field) IN (1,7)
    FROM (
        SELECT DISTINCT DATE(payment_date) as date_field FROM online_payments
        UNION
        SELECT DISTINCT DATE(created_at) FROM commissions
    ) dates
    ON DUPLICATE KEY UPDATE is_holiday = VALUES(is_holiday);
    
    -- Nettoyage des données existantes
    TRUNCATE TABLE analytics_commissions;
    
    -- Chargement des données de commission
    INSERT INTO analytics_commissions
    (date_id, company_id, product_id, user_id, contract_id, amount, fees, net_amount, status, payment_gateway, days_to_payment)
    SELECT 
        DATE(c.created_at) as date_id,
        c.id,
        co.id,
        co.created_by as user_id,
        c.id,
        c.amount,
        IFNULL(op.fees, 0) as fees,
        c.amount - IFNULL(op.fees, 0) as net_amount,
        c.status,
        op.gateway as payment_gateway,
        DATEDIFF(IFNULL(op.payment_date, CURDATE()), c.created_at) as days_to_payment
    FROM commissions c
    JOIN contracts co ON c.id = co.id
    LEFT JOIN online_payments op ON c.id = op.commission_id;
    
    -- Calcul des KPIs agrégés
    TRUNCATE TABLE analytics_kpis;
    
    INSERT INTO analytics_kpis
    (date_id, company_id, user_id, total_commissions, paid_commissions, pending_commissions, avg_payment_days, conversion_rate)
    SELECT 
        d.date_id,
        NULL as company_id,
        NULL as user_id,
        SUM(ac.amount) as total_commissions,
        SUM(CASE WHEN ac.status = 'paid' THEN ac.amount ELSE 0 END) as paid_commissions,
        SUM(CASE WHEN ac.status = 'pending' THEN ac.amount ELSE 0 END) as pending_commissions,
        AVG(CASE WHEN ac.status = 'paid' THEN ac.days_to_payment ELSE NULL END) as avg_payment_days,
        COUNT(DISTINCT CASE WHEN ac.status = 'paid' THEN ac.contract_id ELSE NULL END) / 
        COUNT(DISTINCT ac.contract_id) * 100 as conversion_rate
    FROM analytics_commissions ac
    JOIN analytics_dim_date d ON ac.date_id = d.date_id
    GROUP BY d.date_id;
END //
DELIMITER ;
CREATE TABLE commission_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    method ENUM('Virement', 'Chèque', 'Prélèvement') DEFAULT 'Virement',
    reference VARCHAR(100) NOT NULL,
    period_start DATE NOT NULL, -- Période couverte
    period_end DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    bank_details TEXT,
    notes TEXT,
    processed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id),
    FOREIGN KEY (processed_by) REFERENCES users(id)
);
-- Table des rendez-vous
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('Planifié', 'Confirmé', 'Annulé', 'Terminé') DEFAULT 'Planifié',
    location VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Procédure de calcul avancée (MySQL)
DELIMITER //
CREATE PROCEDURE CalculateAdvancedCommission(IN contract_id_param INT)
BEGIN
    DECLARE base_amount DECIMAL(10,2);
    DECLARE company_id_val INT;
    DECLARE product_id_val INT;
    DECLARE final_commission DECIMAL(10,2);
    DECLARE applicable_rule_id INT;
    
    -- Récupération des données du contrat
    SELECT c.premium, c.company_id, cp.product_id
    INTO base_amount, company_id_val, product_id_val
    FROM contracts c
    LEFT JOIN company_products cp ON c.product_id = cp.product_id
    WHERE c.contract_id = contract_id_param;
    
    -- Trouver la règle applicable (avec priorité)
    SELECT rule_id INTO applicable_rule_id
    FROM commission_rules
    WHERE company_id = company_id_val
    AND (product_id IS NULL OR product_id = product_id_val)
    AND (valid_from <= CURDATE() AND (valid_to IS NULL OR valid_to >= CURDATE()))
    AND is_active = TRUE
    ORDER BY priority DESC, rule_id DESC
    LIMIT 1;
    
    -- Calcul selon le type de règle
    IF applicable_rule_id IS NOT NULL THEN
        SELECT calculation_type INTO @calc_type
        FROM commission_rules
        WHERE rule_id = applicable_rule_id;
        
        CASE @calc_type
            WHEN 'fixed' THEN
                SET final_commission = (SELECT base_value FROM commission_rules WHERE rule_id = applicable_rule_id);
            
            WHEN 'percentage' THEN
                SET final_commission = base_amount * 
                    (SELECT base_value FROM commission_rules WHERE rule_id = applicable_rule_id) / 100;
            
            WHEN 'tiered' THEN
                SET final_commission = 0;
                
                -- Calcul par tranches
                SELECT SUM(
                    LEAST(IFNULL(t.max_amount, base_amount), base_amount) - t.min_amount
                ) * t.rate / 100
                INTO final_commission
                FROM commission_tiers t
                WHERE t.rule_id = applicable_rule_id
                AND t.min_amount < base_amount;
        END CASE;
        
        -- Enregistrement de la commission
        INSERT INTO commissions (contract_id, company_id, amount, commission_rate, calculation_base, status, rule_id)
        VALUES (
            contract_id_param, 
            company_id_val, 
            final_commission,
            (final_commission / base_amount * 100),
            base_amount,
            'pending',
            applicable_rule_id
        );
        
        -- Mise à jour du contrat
        UPDATE contracts 
        SET commission_amount = final_commission,
            commission_calculated = TRUE
        WHERE contract_id = contract_id_param;
    END IF;
END //
DELIMITER ;

-- TABLE : reseaux_sociaux
CREATE TABLE reseaux_sociaux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icone VARCHAR(100),
    actif BOOLEAN DEFAULT TRUE,
    date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    UNIQUE(token)
);

CREATE TABLE chat_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL, -- NULL si visiteur non connecté
  guest_id VARCHAR(100), -- identifiant visiteur
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT,
  file_path TEXT,
  audio_path TEXT,
  seen BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE chat_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message_id INT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (message_id) REFERENCES chat_messages(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT,
    attachment_path VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE life_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    client_id INT NOT NULL,
    company_id INT NOT NULL,
    
    contract_number VARCHAR(50) NOT NULL UNIQUE,

    contract_type ENUM('vie', 'décès', 'mixte') NOT NULL DEFAULT 'vie',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_years INT NOT NULL,
    
    premium_mode ENUM('unique', 'mensuel', 'trimestriel', 'annuel') DEFAULT 'mensuel',
    premium_amount DECIMAL(15,2) NOT NULL,
    total_paid DECIMAL(15,2) DEFAULT 0.00,
    
    insured_amount DECIMAL(15,2) NOT NULL, -- capital garanti
    currency VARCHAR(10) DEFAULT 'BIF',

    status ENUM('actif', 'suspendu', 'résilié', 'échu') DEFAULT 'actif',
    termination_reason TEXT,
    
    beneficiary_name VARCHAR(255),
    beneficiary_relation VARCHAR(100),
    beneficiary_nid VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES insurance_companies(id) ON DELETE CASCADE
);

CREATE TABLE contrats_vie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    type ENUM('vie', 'deces', 'mixte') NOT NULL,
    capital DECIMAL(12,2) NOT NULL,
    duree INT NOT NULL,
    prime_mensuelle DECIMAL(12,2) NOT NULL,
    date_souscription DATE NOT NULL,
    end_date DATE NOT NULL,
    statut ENUM('actif', 'résilié') DEFAULT 'actif',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);







-- RESEAUX SOCIAUX
INSERT INTO reseaux_sociaux (nom, url, icone, actif) VALUES
('Facebook', 'https://facebook.com/bi.insuranceBrokers', 'fab fa-facebook', 1),
('Twitter', 'https://twitter.com/bi_insuranceBrokers', 'fab fa-twitter', 1),
('LinkedIn', 'https://linkedin.com/company/bi-insuranceBrokers', 'fab fa-linkedin', 1),
('YouTube', 'https://youtube.com/@bi_insuranceBrokers', 'fab fa-youtube', 1);


-- 1. Catégories
INSERT INTO categories (name, description) VALUES
('Auto', 'Assurance automobile'),
('Santé', 'Assurance santé'),
('Habitation', 'Assurance habitation');

-- 2. Compagnies d'assurance
INSERT INTO insurance_companies (name, NIF, Registre_com, email, phone, address, city, country, contact_person, contact_email, contact_phone, payment_terms, contract_start_date, contract_end_date, logo_path)
VALUES
('AssurPlus', 'NIF12345678', 'RC98765', 'contact@assurplus.fr', '0601020304', '10 rue des Lilas', 'Paris', 'France', 'M. Durand', 'durand@assurplus.fr', '0601020305', '30 jours', '2024-01-01', '2026-01-01', 'assurplus.png'),
('VitalAssur', 'NIF22334455', 'RC54321', 'contact@vitalassur.fr', '0602030405', '25 avenue de la République', 'Lyon', 'France', 'Mme Dupuis', 'dupuis@vitalassur.fr', '0602030406', '60 jours', '2023-06-01', '2025-06-01', 'vitalassur.png');

-- 3. Utilisateurs
INSERT INTO users (username, password, email, role, first_name, last_name, phone, insurance_company_id)
VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye...', 'admin@example.com', 'admin', 'Alice', 'Admin', '0600000001', NULL),
('courtier1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye...', 'courtier1@example.com', 'courtier', 'Jean', 'Courtier', '0600000002', 1),
('partenaire', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye...', 'partenaire@example.com', 'partenaire', 'Julie', 'Partenaire', '0600000003', 2),
('client1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye...', 'client1@example.com', 'client', 'Paul', 'Client', '0600000004', NULL);

-- 4. Types d'assurance
INSERT INTO insurance_types (name, description, category_id, company_id)
VALUES
('Assurance auto classique', 'Formule standard pour véhicule particulier', 1, 1),
('Assurance santé premium', 'Couverture santé étendue', 2, 2),
('Assurance habitation éco', 'Protection de base pour logement', 3, 1);

-- 5. Clients
INSERT INTO customers (civility, first_name, last_name, birth_date, email, phone, address_line1, postal_code, city, marital_status, profession, tax_id)
VALUES
('MR', 'Michel', 'Durand', '1980-05-15', 'michel.durand@example.com', '0601234567', '5 rue de Paris', '75001', 'Paris', 'MARRIED', 'Comptable', 'TX12345678'),
('Mme', 'Sophie', 'Martin', '1990-10-20', 'sophie.martin@example.com', '0602345678', '8 boulevard Haussmann', '75009', 'Paris', 'SINGLE', 'Infirmière', 'TX87654321');

-- 1. Supprimer temporairement le trigger
DROP TRIGGER IF EXISTS after_contract_insert;

-- 2. Insérer les données normalement
INSERT INTO contracts (customer_id, type_id, reference, start_date, end_date, premium, status, company_id, created_by, commission_rate)
VALUES
(1, 1, 'CTR-001', '2024-01-01', '2025-01-01', 800.00, 'Actif', 1, 2, 10.00),
(2, 2, 'CTR-002', '2024-03-01', '2025-03-01', 600.00, 'Actif', 2, 3, 12.00);

-- 3. Recréer le trigger
DELIMITER //
CREATE TRIGGER after_contract_insert
AFTER INSERT ON contracts
FOR EACH ROW
BEGIN
    CALL CalculateCommission(NEW.id);
END //
DELIMITER ;

-- 7. Commissions
INSERT INTO commissions (contract_id, company_id, amount, commission_rate, calculation_base, status)
VALUES
(1, 1, 80.00, 10.00, 800.00, 'confirmed'),
(2, 2, 72.00, 12.00, 600.00, 'pending');

-- 8. Documents
INSERT INTO documents (entity_type, entity_id, document_type, file_path, uploaded_by, description)
VALUES
('contract', 1, 'Contrat signé', 'uploads/contracts/CTR-001.pdf', 2, 'Document signé par le client'),
('contract', 2, 'Contrat signé', 'uploads/contracts/CTR-002.pdf', 3, 'Document signé par le client');

-- 9. Devis
INSERT INTO quotes (customer_id, type_id, reference, amount, validity_date, status, created_by)
VALUES
(1, 1, 'QTE-001', 750.00, '2024-07-31', 'Envoyé', 2),
(2, 2, 'QTE-002', 580.00, '2024-07-15', 'Accepté', 3);

-- 10. Paiements
INSERT INTO payments (contract_id, amount, payment_date, method, status, reference)
VALUES
(1, 800.00, '2024-01-05', 'Carte', 'Validé', 'PAY-001'),
(2, 600.00, '2024-03-03', 'Virement', 'Validé', 'PAY-002');

-- 11. Sinistres
INSERT INTO claims (contract_id, claim_date, description, amount, status, decision_date, processed_by)
VALUES
(1, '2024-06-01', 'Accident de voiture - pare-chocs endommagé', 500.00, 'En cours', NULL, 2);

-- 12. Produits
INSERT INTO company_products (company_id, type_id, product_code, name, base_price, commission_rate)
VALUES
(1, 1, 'AUTO-STD-01', 'Formule Auto Standard', 800.00, 10.00),
(2, 2, 'SANTÉ-PREMIUM', 'Santé Premium', 600.00, 12.00);

-- 13. Règles de commission
INSERT INTO commission_rules (company_id, product_id, name, calculation_type, base_value, valid_from)
VALUES
(1, 1, 'Commission fixe auto', 'fixed', 80.00, '2024-01-01'),
(2, 2, 'Commission pour santé premium', 'percentage', 12.00, '2024-01-01');

-- 14. Tiers de commission
INSERT INTO commission_tiers (rule_id, min_amount, max_amount, rate)
VALUES
(2, 0, 500.00, 10.00),
(2, 500.01, 1000.00, 12.00);

-- 15. Rendez-vous
INSERT INTO appointments (customer_id, user_id, title, description, start_time, end_time)
VALUES
(1, 2, 'RDV téléphonique', 'Suivi client sur contrat CTR-001', '2024-07-01 10:00:00', '2024-07-01 10:30:00');

-- 16. Paiements en ligne
INSERT INTO online_payments (commission_id, gateway, transaction_id, amount, fees, net_amount, status)
VALUES
(1, 'stripe', 'txn_123456', 80.00, 1.50, 78.50, 'completed');

-- 17. Documents clients
INSERT INTO customer_documents (customer_id, document_type, file_path)
VALUES
(1, 'ID_PROOF', 'uploads/ids/michel_id.pdf'),
(2, 'ID_PROOF', 'uploads/ids/sophie_id.pdf');

-- 18. Contacts clients
INSERT INTO customer_contacts (customer_id, contact_type, first_name, last_name, phone, email, is_authorized)
VALUES
(1, 'EMERGENCY', 'Laura', 'Durand', '0611223344', 'laura.durand@example.com', TRUE);


