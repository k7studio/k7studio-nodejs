<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K7 Studio - Transforme Sua Vida Através da Dança</title>
    
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-6 py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="img/k7studio-logo-white.png" alt="K7 Studio Logo" class="h-16">
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#home" class="text-white hover:text-highlight transition">Início</a>
                    <a href="#about" class="text-white hover:text-highlight transition">Sobre</a>
                    <a href="#search" class="text-white hover:text-highlight transition">O Que Oferecemos</a>
                    <a href="#classes" class="text-white hover:text-highlight transition">Aulas</a>
                    <a href="#schedule" class="text-white hover:text-highlight transition">Horários</a>
                    <a href="#teachers" class="text-white hover:text-highlight transition">Professores</a>
                    <a href="#benefits" class="text-white hover:text-highlight transition">Benefícios</a>
                    <a href="#contact" class="text-white hover:text-highlight transition">Contato</a>
                </div>
                <div class="md:hidden">
                    <button class="mobile-menu-button">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div class="mobile-menu hidden md:hidden bg-accent">
            <a href="#home" class="block py-2 px-4 text-white hover:bg-primary">Início</a>
            <a href="#about" class="block py-2 px-4 text-white hover:bg-primary">Sobre</a>
            <a href="#search" class="block py-2 px-4 text-white hover:bg-primary">O Que Oferecemos</a>
            <a href="#classes" class="block py-2 px-4 text-white hover:bg-primary">Aulas</a>
            <a href="#schedule" class="block py-2 px-4 text-white hover:bg-primary">Horários</a>
            <a href="#teachers" class="block py-2 px-4 text-white hover:bg-primary">Professores</a>
            <a href="#benefits" class="block py-2 px-4 text-white hover:bg-primary">Benefícios</a>
            <a href="#contact" class="block py-2 px-4 text-white hover:bg-primary">Contato</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section text-white py-20 md:py-32">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-bounce">Transforme Sua Vida Através da Dança!</h1>
            <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Junte-se a nós aqui na K7 Studio e descubra os benefícios da dança para a saúde, autoestima e socialização.</p>
            <a href="#contact" class="bg-highlight text-primary font-bold py-3 px-8 rounded-full hover:bg-white hover:text-primary transition duration-300 inline-block transform hover:scale-105">
                Reserve sua Aula Grátis Agora!
            </a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Sobre Nós</h2>
            <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <img src="img/sobre2.jpg" 
                         alt="K7 Studio" class="rounded-lg shadow-xl w-full h-auto">
                </div>
                <div class="md:w-1/2">
                    <h3 class="text-2xl font-bold text-primary mb-4">Conheça a K7 Studio: Movimento, Arte e Saúde em um só lugar.</h3>
                    <p class="text-gray-700 mb-4 text-lg">
                        A K7 Studio nasceu em 2023 da paixão do artista plástico Nelson Vilhena por conectar arte, movimento e bem-estar. Localizada em um charmoso casarão antigo na Travessa Guerra Passos, 60, em Belém do Pará, a K7 Studio é um espaço único criado para cuidar da sua saúde física e mental.
                    </p>
                    <p class="text-gray-700 mb-4 text-lg">
                        Sob a consultoria de Marcelino Thiganá, nossa missão é clara: levar saúde às pessoas através do movimento, aliado à neurociência. Acreditamos que a sinergia entre corpo e mente é a chave para uma vida plena e equilibrada.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Search Section -->
    <section id="search" class="py-16 bg-accent text-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">O que você encontra na K7 Studio?</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Movimento & Arte -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-person-running"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Movimento & Arte</h3>
                    <p>K7 Dance: Aulas de Dança de Salão, Brega, Tecnobrega, Forró e muito mais para você se expressar e se movimentar com paixão.</p>
                </div>
                
                <!-- Saúde & Bem-Estar -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Saúde & Bem-Estar</h3>
                    <p>Em breve Consultórios: Atendimentos de nutrição e psicologia para um cuidado completo.</p>
                </div>
                
                <!-- Experiência & Comunidade -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Experiência & Comunidade</h3>
                    <p>Café K7: Um espaço acolhedor para relaxar e recarregar as energias. Loja K7: Produtos especiais para quem ama arte e movimento.</p>
                </div>

                <!-- Nossa Visão -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Nossa Visão</h3>
                    <p>Nossa meta é nos tornarmos o maior estúdio da Região Norte, oferecendo excelência em saúde física e mental. Na K7 Studio, cada detalhe foi pensado para proporcionar uma experiência transformadora e completa.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Dance Classes Section -->
    <section id="classes" class="py-16 bg-highlight">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Descubra Nossas Aulas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Dance Card 1 -->
                <div class="dance-card bg-white rounded-lg overflow-hidden shadow-md transition duration-500">
                    <img src="img/sobre1.jpg" 
                         alt="Dança de Salão" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                        <p class="text-gray-700 mb-4">Aprenda a dançar com confiança e elegância.</p>
                        <a href="#contact" class="text-accent font-semibold hover:text-primary transition">Saiba mais →</a>
                    </div>
                </div>
                
                <!-- Dance Card 2 -->
                <div class="dance-card bg-white rounded-lg overflow-hidden shadow-md transition duration-500">
                    <img src="img/casal01d.jpg" 
                         alt="Casais dançando Brega no Pará" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-2">Brega e Forró</h3>
                        <p class="text-gray-700 mb-4">Sinta a batida da nossa cultura paraense.</p>
                        <a href="#contact" class="text-accent font-semibold hover:text-primary transition">Saiba mais →</a>
                    </div>
                </div>
                
                <!-- Dance Card 3 -->
                <div class="dance-card bg-white rounded-lg overflow-hidden shadow-md transition duration-500">
                    <img src="img/casal01g.jpg" 
                         alt="Salsa e Merengue" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-2">Bachata e Bolero</h3>
                        <p class="text-gray-700 mb-4">Deixe-se levar pelo ritmo latino.</p>
                        <a href="#contact" class="text-accent font-semibold hover:text-primary transition">Saiba mais →</a>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <!-- Class Schedule Section -->
    <section id="schedule" class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Horários das Aulas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Class 1 -->
                <div class="bg-highlight rounded-lg overflow-hidden shadow-md p-6">
                    <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                    <p class="font-semibold mb-1">Professor Marcelino Thiganá</p>
                    <p class="mb-2"><span class="font-medium">Ritmos:</span> Brega, Samba, Bolero e Bachata</p>
                    <p class="mb-2"><span class="font-medium">Nível:</span> Avançada</p>
                    <p class="mb-2"><span class="font-medium">Dia:</span> Terça-feira</p>
                    <p><span class="font-medium">Horário:</span> 18:30h às 20:00h</p>
                </div>
                
                <!-- Class 2 -->
                <div class="bg-highlight rounded-lg overflow-hidden shadow-md p-6">
                    <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                    <p class="font-semibold mb-1">Professor Marcelino Thiganá</p>
                    <p class="mb-2"><span class="font-medium">Ritmos:</span> Brega e Forró</p>
                    <p class="mb-2"><span class="font-medium">Nível:</span> Iniciante</p>
                    <p class="mb-2"><span class="font-medium">Dia:</span> Terça-feira</p>
                    <p><span class="font-medium">Horário:</span> 20:00h às 21:30h</p>
                </div>
                
                <!-- Class 3 -->
                <div class="bg-highlight rounded-lg overflow-hidden shadow-md p-6">
                    <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                    <p class="font-semibold mb-1">Professora Carol Mikelly</p>
                    <p class="mb-2"><span class="font-medium">Ritmos:</span> Brega, Forró e Bolero</p>
                    <p class="mb-2"><span class="font-medium">Nível:</span> Iniciante</p>
                    <p class="mb-2"><span class="font-medium">Dia:</span> Quarta-feira</p>
                    <p><span class="font-medium">Horário:</span> 18:30h às 20:00h</p>
                </div>
                
                <!-- Class 4 -->
                <div class="bg-highlight rounded-lg overflow-hidden shadow-md p-6">
                    <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                    <p class="font-semibold mb-1">Professor Bruno Caldas</p>
                    <p class="mb-2"><span class="font-medium">Ritmo:</span> Brega</p>
                    <p class="mb-2"><span class="font-medium">Nível:</span> Iniciante</p>
                    <p class="mb-2"><span class="font-medium">Dia:</span> Sexta-feira</p>
                    <p><span class="font-medium">Horário:</span> 19:00h às 20:00h</p>
                </div>
                
                <!-- Class 5 -->
                <div class="bg-highlight rounded-lg overflow-hidden shadow-md p-6">
                    <h3 class="text-xl font-bold text-primary mb-2">Dança de Salão</h3>
                    <p class="font-semibold mb-1">Professor Nilson Nunes</p>
                    <p class="mb-2"><span class="font-medium">Ritmos:</span> Brega e Forró</p>
                    <p class="mb-2"><span class="font-medium">Nível:</span> Iniciante</p>
                    <p class="mb-2"><span class="font-medium">Dia:</span> Sábado</p>
                    <p><span class="font-medium">Horário:</span> 17:00h às 18:00h</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Teachers Section -->
    <section id="teachers" class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Conheça a Equipe</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-12">
                Com uma equipe apaixonada e qualificada, incluindo Marcelino Thiganá, nossos professores trazem experiência internacional de países como Argentina e e Alemanha, prontos para guiá-lo em sua jornada de dança.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Teacher 1 -->
                <div class="teacher-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-500">
                    <img src="img/marcelo1.jpg" 
                         alt="Marcelino Thiganá" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-1">Marcelino Thiganá</h3>
                        <p class="text-accent mb-2">Professor</p>
                        <p class="text-gray-700 text-sm">36 anos de experiência em dança de salão e ritmos brasileiros.</p>
                    </div>
                </div>
                
                <!-- Teacher 2 -->
                <div class="teacher-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-500">
                    <img src="img/carol1.jpg" 
                         alt="Carol Mikelly" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-1">Carol Mikelly</h3>
                        <p class="text-accent mb-2">Professora</p>
                        <p class="text-gray-700 text-sm">Especialista em Brega, Forró e Bolero.</p>
                    </div>
                </div>
                
                <!-- Teacher 3 -->
                <div class="teacher-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-500">
                    <img src="img/bruno1.jpg" 
                         alt="Bruno Caldas" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-1">Bruno Caldas</h3>
                        <p class="text-accent mb-2">Professor</p>
                        <p class="text-gray-700 text-sm">Especialista em Brega e ritmos paraenses.</p>
                    </div>
                </div>
                
                <!-- Teacher 4 -->
                <div class="teacher-card bg-white rounded-lg overflow-hidden shadow-lg transition duration-500">
                    <img src="img/nilson1.jpg" 
                         alt="Nilson Nunes" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary mb-1">Nilson Nunes</h3>
                        <p class="text-accent mb-2">Professor</p>
                        <p class="text-gray-700 text-sm">Especialista em Brega e Forró para iniciantes.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-16 bg-accent text-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Por Que Dançar?</h2>
            <p class="text-center text-xl mb-12 max-w-3xl mx-auto">
                A dança não é apenas uma forma de arte; é um caminho para o bem-estar integral.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Benefit 1 -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Saúde Física</h3>
                    <p>Melhora a circulação, flexibilidade, coordenação motora e resistência cardiovascular.</p>
                </div>
                
                <!-- Benefit 2 -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Saúde Mental</h3>
                    <p>Reduz o estresse, aumenta a produção de endorfinas e melhora a memória.</p>
                </div>
                
                <!-- Benefit 3 -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-user-friends"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Socialização</h3>
                    <p>Oportunidade de fazer novas amizades e se conectar com pessoas que compartilham o mesmo interesse.</p>
                </div>
                
                <!-- Benefit 4 -->
                <div class="bg-primary p-6 rounded-lg shadow-lg">
                    <div class="text-4xl mb-4">
                        <i class="fas fa-smile"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Autoestima</h3>
                    <p>Aumenta a confiança e a autoimagem, ajudando a superar a timidez.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Transformações Reais</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Testimonial 1 -->
                <div class="testimonial-card bg-highlight p-8 rounded-lg shadow-md transition duration-500">
                    <div class="flex items-center mb-4">
                        <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <div class="ml-4">
                            <h4 class="font-bold text-primary">Maria, 58 anos</h4>
                            <p class="text-sm text-gray-600">Aluna há 2 anos</p>
                        </div>
                    </div>
                    <p class="text-gray-700">
                        "Comecei a dançar no K7 Studio e minha vida mudou completamente. Antes eu tinha vergonha até de sair de casa, hoje sou mais feliz e confiante! Os professores são pacientes e o ambiente é muito acolhedor."
                    </p>
                </div>
                
                <!-- Testimonial 2 -->
                <div class="testimonial-card bg-highlight p-8 rounded-lg shadow-md transition duration-500">
                    <div class="flex items-center mb-4">
                        <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <div class="ml-4">
                            <h4 class="font-bold text-primary">João, 47 anos</h4>
                            <p class="text-sm text-gray-600">Aluno há 6 meses</p>
                        </div>
                    </div>
                    <p class="text-gray-700">
                        "Não tenho par para dançar e mesmo assim me senti acolhido desde o primeiro dia. A equipe e os alunos são incríveis! Nunca pensei que aos 47 anos iria aprender a dançar, mas aqui me provaram que nunca é tarde."
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Location Section -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <h2 class="text-3xl md:text-4xl font-bold text-primary mb-6">Venha Nos Visitar!</h2>
                    <p class="text-gray-700 mb-4">
                        Estamos localizados na Travessa Guerra Passos, 60, em Canudos, Belém-PA.
                    </p>
                    <p class="text-gray-700 mb-6">
                        Nosso estúdio é acolhedor e adaptado para todos, incluindo pessoas com necessidades especiais. Venha conferir!
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <i class="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                            <p>Travessa Guerra Passos, 60 - Canudos, Belém - PA</p>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-phone-alt text-primary mr-3"></i>
                            <p>(91) 98262-1877</p>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-envelope text-primary mr-3"></i>
                            <p>k7.danceandsport@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <div class="aspect-w-16 aspect-h-9">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5600000000004!2d-48.4628558!3d-1.448444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjYnNTQuNCJTIDQ4wrAyNyc0Ni4zIlc!5e0!3m2!1sen!2sbr!4v1620000000000!5m2!1sen!2sbr" 
                                width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" class="rounded-lg shadow-lg"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Special Offer Section -->
    <section class="py-16 bg-primary text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Promoção Imperdível!</h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                Reserve sua aula experimental gratuita e descubra como a dança pode transformar sua vida!
            </p>
            <p class="text-xl mb-8 font-bold">
                Não perca essa oportunidade!
            </p>
            <a href="https://wa.me/5591982621877" target="_blank" class="bg-highlight text-primary font-bold py-3 px-8 rounded-full hover:bg-white hover:text-primary transition duration-300 inline-block transform hover:scale-105">
                <i class="fab fa-whatsapp mr-2"></i> Clique aqui para entrar em contato pelo WhatsApp!
            </a>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Questões Frequentes</h2>
            <div class="max-w-3xl mx-auto">
                <!-- FAQ Item 1 -->
                <div class="mb-6 border-b border-gray-200 pb-6">
                    <h3 class="text-xl font-bold text-primary mb-2">"Não tenho jeito para dançar!"</h3>
                    <p class="text-gray-700">
                        Não se preocupe! Todos os nossos professores são especialmente treinados para ajudar iniciantes. Acreditamos que qualquer pessoa pode aprender a dançar com a orientação correta e prática.
                    </p>
                </div>
                
                <!-- FAQ Item 2 -->
                <div class="mb-6 border-b border-gray-200 pb-6">
                    <h3 class="text-xl font-bold text-primary mb-2">"Sou muito velho(a) para começar."</h3>
                    <p class="text-gray-700">
                        Nunca é tarde para aprender! Temos aulas específicas para a melhor idade, com ritmos e intensidades adaptadas. Já tivemos alunos começando com mais de 70 anos que hoje dançam com desenvoltura.
                    </p>
                </div>
                
                <!-- FAQ Item 3 -->
                <div class="mb-6 pb-6">
                    <h3 class="text-xl font-bold text-primary mb-2">"Não tenho par para dançar."</h3>
                    <p class="text-gray-700">
                        As aulas são abertas e acolhem todos, independentemente de ter ou não parceiro. Muitos alunos vêm sozinhos e acabam encontrando parceiros de dança nas próprias aulas. Além disso, os professores dançam com todos os alunos durante as aulas.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section id="contact" class="py-16 bg-highlight">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-6">Pronto para Transformar Sua Vida?</h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                Entre em contato agora e comece sua jornada na dança!
            </p>
            <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                <a href="https://wa.me/5591982621877" target="_blank" class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-accent transition duration-300 inline-block">
                    <i class="fab fa-whatsapp mr-2"></i> Fale Conosco pelo WhatsApp!
                </a>
                <a href="tel:+5591982621877" class="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 inline-block">
                    <i class="fas fa-phone-alt mr-2"></i> (91) 98262-1877
                </a>
            </div>
            <div class="mt-8">
                <p class="text-gray-700 mb-2">Ou nos encontre nas redes sociais:</p>
                <div class="flex justify-center space-x-4">
                    <a href="mailto:k7.danceandsport@gmail.com" class="text-primary hover:text-accent text-2xl">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a href="https://instagram.com/k7.danceandsport" target="_blank" class="text-primary hover:text-accent text-2xl">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com/k7.danceandsport" target="_blank" class="text-primary hover:text-accent text-2xl">
                        <i class="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-white py-8">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <img src="img/k7studio-logo-white.png" alt="K7 Studio Logo" class="h-12">
                </div>
                <div class="text-center md:text-right">
                    <p>&copy; 2025 K7 Studio. Todos os direitos reservados.</p>
                    <p class="text-sm mt-2">Travessa Guerra Passos, 60 - Canudos, Belém - PA</p>
                </div>
            </div>
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>
