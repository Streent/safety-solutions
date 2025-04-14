-- Verificar e corrigir o usuário admin
DO $$
DECLARE
  user_exists BOOLEAN;
  user_id UUID;
  correct_password TEXT := '$2a$10$Ot0Aq3Wtr4zzSZ.oRaWdXOVY5Vavl4pRCIbgQqP.MU/FWWMJ1FwMO'; -- password123
BEGIN
  -- Verificar se o usuário existe na tabela auth.users
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@safetysolutions.com') INTO user_exists;

  IF user_exists THEN
    -- Obter o ID do usuário
    SELECT id INTO user_id FROM auth.users WHERE email = 'admin@safetysolutions.com';
    
    -- Atualizar a senha do usuário para garantir que seja a correta
    UPDATE auth.users 
    SET encrypted_password = correct_password,
        updated_at = NOW(),
        email_confirmed_at = NOW()
    WHERE id = user_id;
    
    RAISE NOTICE 'Usuário admin atualizado com sucesso. ID: %', user_id;
  ELSE
    -- Criar o usuário admin se não existir
    INSERT INTO auth.users (
      id,
      email,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
    )
    VALUES (
      uuid_generate_v4(),
      'admin@safetysolutions.com',
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      correct_password,
      NOW(),
      NOW(),
      NOW()
    )
    RETURNING id INTO user_id;
    
    -- Verificar se o usuário existe na tabela users
    SELECT EXISTS(SELECT 1 FROM users WHERE email = 'admin@safetysolutions.com') INTO user_exists;
    
    IF NOT user_exists THEN
      -- Inserir na tabela users
      INSERT INTO users (
        id,
        name,
        email,
        phone,
        position,
        company_id
      )
      VALUES (
        user_id,
        'Administrador',
        'admin@safetysolutions.com',
        '(11) 98765-4321',
        'Administrador do Sistema',
        NULL
      );
    END IF;
    
    RAISE NOTICE 'Usuário admin criado com sucesso. ID: %', user_id;
  END IF;
END $$;
