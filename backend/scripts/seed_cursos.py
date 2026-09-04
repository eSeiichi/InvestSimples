"""Popula o banco com os cursos iniciais do InvestSimples.

Uso (a partir da pasta backend/):

    venv/Scripts/python.exe -m scripts.seed_cursos            # insere
    venv/Scripts/python.exe -m scripts.seed_cursos --listar   # só mostra o que existe
    venv/Scripts/python.exe -m scripts.seed_cursos --remover  # apaga o que este script criou

O script é idempotente: cursos que já existem (mesmo título) são pulados, então
rodar duas vezes não duplica nada.

As capas são arquivos estáticos servidos pelo frontend (frontend/public/capas),
por isso o capa_url é um caminho relativo tipo "/capas/renda-fixa.svg".
"""
import sys

from app.database import SessionLocal
from app.models.curso import Curso, Aula

# vídeo usado como exemplo enquanto as aulas reais não são gravadas
VIDEO_EXEMPLO = "https://youtu.be/4nFYQ1JUGAI?si=UGlfRXwObv1MUZNk"

CURSOS = [
    {
        "titulo": "Primeiros passos no mundo dos investimentos",
        "descricao": (
            "Entenda o básico do sistema financeiro, monte sua reserva de emergência "
            "e faça a primeira aplicação com segurança."
        ),
        "nivel": "iniciante",
        "capa_url": "/capas/primeiros-passos.svg",
        "aulas": [
            ("Por que investir?", "O custo de deixar o dinheiro parado na conta.", 12, True),
            ("Organizando o orçamento", "Como sobrar dinheiro no fim do mês.", 18, True),
            ("Reserva de emergência", "Quanto guardar e onde deixar esse dinheiro.", 15, False),
            ("Abrindo conta na corretora", "Passo a passo, sem mistério.", 9, False),
            ("Sua primeira aplicação", "Na prática: comprando um título público.", 21, True),
        ],
    },
    {
        "titulo": "Renda fixa descomplicada",
        "descricao": (
            "CDB, LCI, LCA, Tesouro Direto e debêntures: o que muda entre eles, "
            "como comparar rentabilidade e quando cada um faz sentido."
        ),
        "nivel": "iniciante",
        "capa_url": "/capas/renda-fixa.svg",
        "aulas": [
            ("O que é renda fixa", "Emprestar dinheiro e receber juros.", 14, True),
            ("Tesouro Direto na prática", "Selic, IPCA+ e prefixado.", 26, True),
            ("CDB, LCI e LCA", "Diferenças, prazos e isenção de IR.", 19, False),
            ("Marcação a mercado", "Por que o título oscila antes do vencimento.", 23, False),
            ("Impostos e taxas", "Tabela regressiva e come-cotas.", 17, False),
            ("Montando uma carteira conservadora", "Juntando tudo o que vimos.", 20, False),
        ],
    },
    {
        "titulo": "Ações: da primeira compra à análise de balanço",
        "descricao": (
            "Como funciona a bolsa, o que olhar antes de comprar uma ação e como "
            "acompanhar os resultados das empresas."
        ),
        "nivel": "intermediário",
        "capa_url": "/capas/acoes.svg",
        "aulas": [
            ("Como funciona a B3", "Pregão, liquidação e home broker.", 16, True),
            ("Lendo um balanço", "DRE, balanço patrimonial e fluxo de caixa.", 34, False),
            ("Indicadores fundamentalistas", "P/L, ROE, dívida líquida e margens.", 28, True),
            ("Dividendos e JCP", "Como a empresa devolve dinheiro ao acionista.", 18, False),
            ("Montando sua carteira", "Diversificação e tamanho de posição.", 22, False),
            ("Erros comuns do iniciante", "O que evitar nos primeiros meses.", 13, False),
            ("Acompanhando os resultados", "Rotina trimestral de revisão.", 15, False),
        ],
    },
    {
        "titulo": "Fundos imobiliários do zero",
        "descricao": (
            "Tijolo, papel e fundo de fundos: como escolher FIIs, ler o relatório "
            "gerencial e viver de aluguel sem comprar imóvel."
        ),
        "nivel": "intermediário",
        "capa_url": "/capas/fiis.svg",
        "aulas": [
            ("O que é um FII", "Cotas, gestor e patrimônio.", 15, True),
            ("Tijolo x papel", "Dois jeitos bem diferentes de ganhar dinheiro.", 21, False),
            ("Lendo o relatório gerencial", "Vacância, inadimplência e P/VP.", 27, False),
            ("Dividend yield sem cair em armadilha", "Quando o rendimento alto é sinal de risco.", 19, False),
            ("Montando uma carteira de FIIs", "Quantos fundos e de quais setores.", 24, False),
        ],
    },
    {
        "titulo": "Planejamento financeiro pessoal",
        "descricao": (
            "Saia das dívidas, defina objetivos com prazo e transforme o orçamento "
            "em um plano que você consegue seguir."
        ),
        "nivel": "iniciante",
        "capa_url": "/capas/planejamento.svg",
        "aulas": [
            ("Diagnóstico: para onde vai seu dinheiro", "Levantando gastos dos últimos 3 meses.", 17, True),
            ("Saindo das dívidas caras", "Cartão, cheque especial e negociação.", 22, False),
            ("Objetivos com prazo e valor", "Curto, médio e longo prazo.", 14, False),
            ("Automatizando os aportes", "Pagar a si mesmo primeiro.", 11, False),
        ],
    },
    {
        "titulo": "Análise técnica na prática",
        "descricao": (
            "Suportes, resistências, tendências e volume — o que os gráficos mostram "
            "e, principalmente, o que eles não mostram."
        ),
        "nivel": "avançado",
        "capa_url": "/capas/analise-tecnica.svg",
        "aulas": [
            ("Candles e leitura de gráfico", "Abertura, fechamento, máxima e mínima.", 20, True),
            ("Suporte, resistência e tendência", "Os três conceitos que sustentam o resto.", 25, False),
            ("Médias móveis", "Curta, longa e cruzamentos.", 18, False),
            ("Volume e força do movimento", "Confirmando (ou não) um rompimento.", 16, False),
            ("Gerenciamento de risco", "Stop, tamanho de posição e disciplina.", 29, False),
            ("Limites da análise técnica", "Onde ela costuma falhar.", 14, False),
        ],
    },
    {
        "titulo": "Investindo no exterior",
        "descricao": (
            "Dolarize parte da carteira: BDRs, ETFs internacionais, conta em corretora "
            "lá fora e a declaração no imposto de renda."
        ),
        "nivel": "avançado",
        "capa_url": "/capas/internacional.svg",
        "aulas": [
            ("Por que ter dólar na carteira", "Proteção cambial na prática.", 16, True),
            ("BDRs: o caminho mais curto", "Comprando empresas de fora pela B3.", 19, False),
            ("ETFs internacionais", "S&P 500, mercados emergentes e renda fixa global.", 23, False),
            ("Abrindo conta no exterior", "Documentos, custos e remessa.", 21, False),
            ("Imposto de renda e câmbio", "O que declarar e quando pagar.", 26, False),
        ],
    },
    {
        "titulo": "Aposentadoria e previdência",
        "descricao": (
            "Quanto você precisa acumular, como a inflação corrói o plano e o que muda "
            "entre PGBL, VGBL e uma carteira própria."
        ),
        "nivel": "intermediário",
        "capa_url": "/capas/aposentadoria.svg",
        "aulas": [
            ("Quanto preciso para me aposentar", "Calculando o patrimônio-alvo.", 24, True),
            ("Juros compostos e tempo", "Por que começar cedo muda tudo.", 15, False),
            ("PGBL x VGBL", "Qual faz sentido para o seu caso.", 20, False),
            ("Taxas que comem a previdência", "Carregamento e administração.", 17, False),
            ("Fase de resgate", "Como sacar sem quebrar o plano.", 22, False),
        ],
    },
    {
        "titulo": "Criptomoedas com pé no chão",
        "descricao": (
            "O que é blockchain, como funcionam as corretoras, custódia e por que essa "
            "classe pede um limite claro na carteira."
        ),
        "nivel": "avançado",
        "capa_url": "/capas/cripto.svg",
        "aulas": [
            ("Blockchain sem enrolação", "O que a tecnologia resolve.", 18, False),
            ("Corretoras e custódia", "Carteira quente, fria e autocustódia.", 22, False),
            ("Riscos e golpes comuns", "Como não perder tudo.", 20, False),
            ("Quanto alocar", "Definindo um limite e respeitando ele.", 13, False),
        ],
    },
    {
        "titulo": "Imposto de renda para investidores",
        "descricao": (
            "Preencha a declaração sem medo: bens e direitos, rendimentos isentos, "
            "apuração de ganhos e o famoso DARF."
        ),
        "nivel": "intermediário",
        "capa_url": "/capas/impostos.svg",
        "aulas": [
            ("O que a Receita já sabe", "Informes da corretora e do banco.", 12, False),
            ("Bens e direitos", "Lançando cada tipo de investimento.", 25, False),
            ("Vendas de ações e DARF", "Isenção de R$ 20 mil e apuração mensal.", 28, False),
            ("Prejuízo acumulado", "Compensando em meses seguintes.", 16, False),
            ("Revisão final da declaração", "Checklist antes de enviar.", 14, False),
        ],
    },
]

TITULOS = [curso["titulo"] for curso in CURSOS]


def conteudo_da_aula(titulo: str, descricao: str) -> str:
    """Texto exibido no bloco 'Sobre esta aula' enquanto o conteúdo real não existe."""
    return (
        f"{descricao}\n\n"
        f"Nesta aula você vai acompanhar, passo a passo, o tema \"{titulo}\". "
        "Use o espaço abaixo do vídeo para revisar os pontos principais, "
        "conferir os materiais de apoio e anotar suas dúvidas antes de seguir "
        "para a próxima aula."
    )


def inserir() -> None:
    db = SessionLocal()
    try:
        existentes = {
            titulo
            for (titulo,) in db.query(Curso.titulo).filter(Curso.titulo.in_(TITULOS)).all()
        }

        criados = 0
        for dados in CURSOS:
            if dados["titulo"] in existentes:
                print(f"  ~ já existe, pulando: {dados['titulo']}")
                continue

            curso = Curso(
                titulo=dados["titulo"],
                descricao=dados["descricao"],
                nivel=dados["nivel"],
                capa_url=dados["capa_url"],
            )
            db.add(curso)
            db.flush()  # garante o id antes de criar as aulas

            for ordem, (titulo, descricao, minutos, tem_video) in enumerate(dados["aulas"]):
                db.add(
                    Aula(
                        titulo=titulo,
                        descricao=descricao,
                        conteudo=conteudo_da_aula(titulo, descricao),
                        url_video=VIDEO_EXEMPLO if tem_video else None,
                        duracao_minutos=minutos,
                        ordem=ordem,
                        curso_id=curso.id,
                    )
                )

            criados += 1
            print(f"  + {dados['titulo']} ({len(dados['aulas'])} aulas)")

        db.commit()
        print(f"\n{criados} curso(s) inserido(s).")
    finally:
        db.close()


def remover() -> None:
    """Apaga apenas os cursos criados por este script (e as aulas deles)."""
    db = SessionLocal()
    try:
        cursos = db.query(Curso).filter(Curso.titulo.in_(TITULOS)).all()
        if not cursos:
            print("Nada para remover.")
            return

        for curso in cursos:
            db.query(Aula).filter(Aula.curso_id == curso.id).delete(synchronize_session=False)
            db.delete(curso)
            print(f"  - {curso.titulo}")

        db.commit()
        print(f"\n{len(cursos)} curso(s) removido(s).")
    finally:
        db.close()


def listar() -> None:
    db = SessionLocal()
    try:
        for curso in db.query(Curso).order_by(Curso.titulo).all():
            total = db.query(Aula).filter(Aula.curso_id == curso.id).count()
            marca = "*" if curso.titulo in TITULOS else " "
            print(f" {marca} {curso.titulo} — {curso.nivel} — {total} aula(s)")
        print("\n(* = criado por este script)")
    finally:
        db.close()


if __name__ == "__main__":
    if "--remover" in sys.argv:
        remover()
    elif "--listar" in sys.argv:
        listar()
    else:
        inserir()
