const { execSync } = require('child_process');

console.log('🚀 Iniciando otimizações...\n');

try {
  // Processar e otimizar imagens
  console.log('📸 Processando imagens...');
  execSync('npm run process-images', { stdio: 'inherit' });
  console.log('✅ Imagens processadas com sucesso!\n');

  // Gerar ícones
  console.log('🎨 Gerando ícones...');
  execSync('npm run generate-icons', { stdio: 'inherit' });
  console.log('✅ Ícones gerados com sucesso!\n');

  // Gerar service worker
  console.log('🔧 Gerando service worker...');
  execSync('npm run generate-sw', { stdio: 'inherit' });
  console.log('✅ Service worker gerado com sucesso!\n');

  // Analisar bundle
  console.log('📊 Analisando bundle...');
  execSync('npm run analyze', { stdio: 'inherit' });
  console.log('✅ Análise do bundle concluída!\n');

  console.log('🎉 Todas as otimizações foram concluídas com sucesso!');
} catch (error) {
  console.error('❌ Erro durante as otimizações:', error);
  process.exit(1);
} 